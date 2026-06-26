// GET /api/subscription?email=xxx - 通过 Creem API 验证用户订阅状态

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email } = req.query;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Email parameter is required" });
    return;
  }

  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Payment service not configured" });
    return;
  }

  try {
    // 通过 Creem API 查询客户信息
    const response = await fetch(
      `https://api.creem.io/v1/customers?email=${encodeURIComponent(email)}`,
      {
        headers: {
          "x-api-key": apiKey,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      // 检查客户是否有活跃订阅
      if (data.customer && data.customer.subscriptions) {
        const activeSub = data.customer.subscriptions.find(
          (sub: { status: string }) =>
            sub.status === "active" || sub.status === "trialing"
        );
        if (activeSub) {
          res.status(200).json({
            active: true,
            source: "creem_api",
            planId: activeSub.product_id,
            currentPeriodEnd: activeSub.current_period_end,
          });
          return;
        }
      }
    }
    // Creem API 查询失败或未找到活跃订阅，继续检查 KV
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;
    const redisUrl = process.env.REDIS_URL;

    // 解析 KV 配置（支持 KV_REST_API_URL 和 REDIS_URL 两种格式）
    let kvConfigUrl = kvUrl;
    let kvConfigToken = kvToken;
    if (!kvConfigUrl || !kvConfigToken) {
      if (redisUrl) {
        const match = redisUrl.match(/^redis[s]?:\/\/default:([^@]+)@([^:]+):(\d+)$/);
        if (match) {
          kvConfigUrl = `https://${match[2]}`;
          kvConfigToken = match[1];
        }
      }
    }

    if (kvConfigUrl && kvConfigToken) {
      const kvResponse = await fetch(
        `${kvConfigUrl}/get/subscriber:${email.toLowerCase().trim()}`,
        {
          headers: {
            Authorization: `Bearer ${kvConfigToken}`,
          },
        }
      );
      if (kvResponse.ok) {
        const kvData = await kvResponse.json();
        if (kvData.result) {
          const subscriber = JSON.parse(kvData.result);
          if (subscriber.status === "active") {
            res.status(200).json({
              active: true,
              source: "kv_store",
              planId: subscriber.planId,
            });
            return;
          }
        }
      }
    }

    res.status(200).json({ active: false, source: "no_subscription_found" });
  } catch (error) {
    console.error("Subscription check error:", error);
    res.status(500).json({ error: "Failed to check subscription" });
  }
}
