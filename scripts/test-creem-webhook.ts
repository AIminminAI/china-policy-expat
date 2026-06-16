/**
 * 模拟 Creem 支付回调测试脚本
 *
 * 用法：
 *   1. 先启动本地开发服务器：npm run dev
 *   2. 在另一个终端运行：npx tsx scripts/test-creem-webhook.ts
 *
 * 注意：本地测试时 webhook 签名验证会失败（因为没有 CREEM_WEBHOOK_SECRET），
 *       所以需要临时跳过签名验证。本脚本会输出完整的 curl 命令供你复制使用。
 */

import crypto from "crypto";

// ============ 配置区 ============
const WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET || "whsec_test_1234567890abcdef";
const WEBHOOK_URL = process.env.WEBHOOK_URL || "http://localhost:3001/api/webhook/creem";
// ================================

// 模拟 checkout.completed 事件
const checkoutCompletedEvent = {
  id: "evt_test_" + Date.now(),
  type: "checkout.completed",
  created_at: new Date().toISOString(),
  data: {
    object: {
      id: "cs_test_" + Date.now(),
      customer_email: "test@example.com",
      amount: 990, // $9.90 (单位：美分)
      currency: "USD",
      status: "completed",
      metadata: {
        planId: "monthly",
        email: "test@example.com",
      },
    },
  },
};

// 模拟 subscription.created 事件
const subscriptionCreatedEvent = {
  id: "evt_sub_" + Date.now(),
  type: "subscription.created",
  created_at: new Date().toISOString(),
  data: {
    object: {
      id: "sub_test_" + Date.now(),
      customer_email: "test@example.com",
      metadata: {
        planId: "monthly",
      },
    },
  },
};

// 模拟 payment.succeeded 事件
const paymentSucceededEvent = {
  id: "evt_pay_" + Date.now(),
  type: "payment.succeeded",
  created_at: new Date().toISOString(),
  data: {
    object: {
      id: "pay_test_" + Date.now(),
      customer_email: "test@example.com",
      amount: 990,
    },
  },
};

function generateSignature(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function printCurlCommand(eventName: string, event: object) {
  const payload = JSON.stringify(event);
  const signature = generateSignature(payload, WEBHOOK_SECRET);

  console.log(`\n${"=".repeat(60)}`);
  console.log(`📋 ${eventName}`);
  console.log(`${"=".repeat(60)}`);
  console.log(`\n🔑 签名: ${signature}`);
  console.log(`📦 载荷: ${payload.substring(0, 100)}...`);
  console.log(`\n💻 curl 命令（复制粘贴到终端执行）:\n`);
  console.log(`curl -X POST ${WEBHOOK_URL} \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -H "x-creem-signature: ${signature}" \\`);
  console.log(`  -d '${payload}'`);
  console.log(`\n`);
}

// 也可以直接用 Node.js 发送请求
async function sendWebhook(eventName: string, event: object) {
  const payload = JSON.stringify(event);
  const signature = generateSignature(payload, WEBHOOK_SECRET);

  console.log(`\n🚀 正在发送 ${eventName}...`);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-creem-signature": signature,
      },
      body: payload,
    });

    const status = response.status;
    const body = await response.text();

    if (status === 200) {
      console.log(`✅ 成功！状态码: ${status}`);
      console.log(`   响应: ${body}`);
    } else if (status === 401) {
      console.log(`❌ 签名验证失败（状态码: ${status}）`);
      console.log(`   这是正常的——本地没有配置 CREEM_WEBHOOK_SECRET`);
      console.log(`   请使用上面的 curl 命令手动测试，或临时修改 webhook 处理器跳过签名验证`);
    } else {
      console.log(`⚠️ 状态码: ${status}`);
      console.log(`   响应: ${body}`);
    }
  } catch (error: any) {
    console.log(`❌ 请求失败: ${error.message}`);
    console.log(`   请确保开发服务器正在运行（npm run dev）`);
  }
}

// ============ 主程序 ============
console.log("🔧 Creem Webhook 本地测试工具");
console.log(`📡 目标地址: ${WEBHOOK_URL}`);
console.log(`🔑 Webhook Secret: ${WEBHOOK_SECRET.substring(0, 10)}...`);

// 打印所有 curl 命令
printCurlCommand("checkout.completed（结账完成）", checkoutCompletedEvent);
printCurlCommand("subscription.created（订阅创建）", subscriptionCreatedEvent);
printCurlCommand("payment.succeeded（支付成功）", paymentSucceededEvent);

// 尝试直接发送
console.log(`\n${"=".repeat(60)}`);
console.log("📨 尝试直接发送 webhook 请求...");
console.log(`${"=".repeat(60)}`);

(async () => {
  await sendWebhook("checkout.completed", checkoutCompletedEvent);

  console.log("\n💡 提示：");
  console.log("   1. 如果签名验证失败，可以临时在 api/webhook/creem.ts 中注释掉签名验证代码");
  console.log("   2. 或者在 .env.local 中设置 CREEM_WEBHOOK_SECRET=whsec_test_1234567890abcdef");
  console.log("   3. 然后用上面的 curl 命令重新测试");
})();
