/**
 * 本地 API 服务器 - 用于开发时测试 API 路由
 * 用法：npx tsx scripts/local-api-server.ts
 *
 * 启动后访问 http://localhost:3001/api/...
 */

import http from "http";
import crypto from "crypto";

const PORT = 3001;

// 简单的 KV 存储模拟
const kvStore = new Map<string, string>();

// 模拟的政策数据
const policies = [
  {
    id: "individual-income-tax-deductions",
    titleEn: "Individual Income Tax Deductions for Foreigners",
    category: "tax",
    summaryEn: "Foreign workers in China can claim additional tax deductions for housing, education, and language training.",
    amount: "Up to ¥18,000/year",
  },
  {
    id: "social-insurance-foreign-employees",
    titleEn: "Social Insurance for Foreign Employees",
    category: "social-insurance",
    summaryEn: "Foreign employees must participate in China social insurance including pension, medical, and unemployment.",
    amount: "Varies by city",
  },
  {
    id: "housing-provident-fund-expats",
    titleEn: "Housing Provident Fund for Expats",
    category: "housing",
    summaryEn: "Some cities allow foreign employees to participate in the Housing Provident Fund for housing benefits.",
    amount: "5-12% of salary",
  },
];

// 处理 API 请求
function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  const path = url.pathname;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,x-api-key,x-creem-signature");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /api/policies
  if (req.method === "GET" && path === "/api/policies") {
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    let filtered = policies;
    if (category) filtered = filtered.filter((p) => p.category === category);
    if (search) filtered = filtered.filter((p) => p.titleEn.toLowerCase().includes(search.toLowerCase()));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ policies: filtered, total: filtered.length }));
    return;
  }

  // POST /api/calculate
  if (req.method === "POST" && path === "/api/calculate") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            eligiblePolicies: [
              { policy: policies[0], estimatedAmount: "¥18,000/year", priority: "high" },
              { policy: policies[1], estimatedAmount: "Varies", priority: "high" },
            ],
            totalEstimated: "¥18,000+/year",
            disclaimer: "Estimates only. Actual amounts may vary. This is not legal advice.",
          })
        );
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // POST /api/checkout
  if (req.method === "POST" && path === "/api/checkout") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        // 模拟 Creem 结账 URL
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            url: `https://checkout.creem.io/test?plan=${data.planId}&email=${data.email}`,
            sessionId: "cs_test_" + Date.now(),
          })
        );
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // POST /api/webhook/creem
  if (req.method === "POST" && path === "/api/webhook/creem") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const signature = req.headers["x-creem-signature"] as string;
      const secret = process.env.CREEM_WEBHOOK_SECRET || "whsec_test_1234567890abcdef";

      // 验证签名
      if (signature) {
        const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
        if (signature !== expected) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid signature" }));
          return;
        }
      }

      try {
        const event = JSON.parse(body);
        console.log(`\n✅ Webhook received: ${event.type}`);

        switch (event.type) {
          case "checkout.completed": {
            const obj = event.data.object;
            kvStore.set(`purchase:${obj.id}`, JSON.stringify({
              sessionId: obj.id,
              email: obj.customer_email,
              amount: obj.amount,
              currency: obj.currency,
              status: obj.status,
              planId: obj.metadata?.planId,
              completedAt: new Date().toISOString(),
            }));
            if (obj.customer_email) {
              kvStore.set(`subscriber:${obj.customer_email}`, JSON.stringify({
                email: obj.customer_email,
                status: "active",
                planId: obj.metadata?.planId,
                updatedAt: new Date().toISOString(),
              }));
            }
            console.log(`   Purchase recorded: ${obj.id} for ${obj.customer_email}`);
            break;
          }
          case "subscription.created": {
            const obj = event.data.object;
            console.log(`   Subscription created: ${obj.id} for ${obj.customer_email}`);
            break;
          }
          case "payment.succeeded": {
            const obj = event.data.object;
            console.log(`   Payment succeeded: ${obj.id} for ${obj.customer_email} amount=${obj.amount}`);
            break;
          }
          default:
            console.log(`   Unhandled event: ${event.type}`);
        }

        // 打印当前 KV 存储
        console.log(`   KV Store entries: ${kvStore.size}`);
        for (const [key, value] of kvStore) {
          console.log(`   - ${key}: ${value}`);
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ received: true }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // POST /api/subscribe
  if (req.method === "POST" && path === "/api/subscribe") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        kvStore.set(`subscriber:${data.email}`, JSON.stringify(data));
        console.log(`\n✅ Subscriber registered: ${data.email}`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
}

const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`🚀 Local API Server running at http://localhost:${PORT}`);
  console.log(`   Available endpoints:`);
  console.log(`   GET  /api/policies?category=&search=`);
  console.log(`   POST /api/calculate`);
  console.log(`   POST /api/checkout`);
  console.log(`   POST /api/webhook/creem`);
  console.log(`   POST /api/subscribe`);
  console.log(``);
  console.log(`💡 To test webhook, run in another terminal:`);
  console.log(`   npx tsx scripts/test-creem-webhook.ts`);
  console.log(`   (Change WEBHOOK_URL to http://localhost:${PORT}/api/webhook/creem)`);
});
