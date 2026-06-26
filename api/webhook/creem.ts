// POST /api/webhook/creem - 处理 Creem webhook 事件

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

interface CreemWebhookEvent {
  id: string;
  type: "checkout.completed" | "subscription.active" | "subscription.canceled" | "subscription.paid" | "subscription.past_due" | "subscription.expired" | "refund.created" | "dispute.created";
  data: {
    object: {
      id: string;
      customer_email: string;
      amount: number;
      currency: string;
      status: string;
      metadata?: Record<string, string>;
    };
  };
  created_at: number;
}

// 验证 Creem webhook 签名
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// 从环境变量获取 KV 配置（支持 KV_REST_API_URL 和 REDIS_URL 两种格式）
function getKVConfig(): { url: string; token: string } | null {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (kvUrl && kvToken) {
    return { url: kvUrl, token: kvToken };
  }

  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    try {
      const match = redisUrl.match(/^redis[s]?:\/\/default:([^@]+)@([^:]+):(\d+)$/);
      if (match) {
        const [, password, host] = match;
        return { url: `https://${host}`, token: password };
      }
    } catch {
      // 解析失败
    }
  }

  return null;
}

// KV 存储操作
async function updateKV(key: string, value: Record<string, unknown>): Promise<boolean> {
  const config = getKVConfig();

  if (!config) {
    return false;
  }

  try {
    await fetch(`${config.url}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    return true;
  } catch (error) {
    console.error("KV write error:", error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("CREEM_WEBHOOK_SECRET is not configured");
    res.status(500).json({ error: "Webhook not configured" });
    return;
  }

  // 获取原始请求体用于签名验证
  const signature = req.headers["creem-signature"] as string;
  const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

  if (!signature || !verifySignature(rawBody, signature, webhookSecret)) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  const event = req.body as CreemWebhookEvent;
  const kvAvailable = getKVConfig() !== null;

  try {
    switch (event.type) {
      case "checkout.completed": {
        const { id, customer_email, amount, currency, status, metadata } = event.data.object;
        const record = {
          sessionId: id,
          email: customer_email,
          amount,
          currency,
          status,
          planId: metadata?.planId,
          completedAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`purchase:${id}`, record);
          if (customer_email) {
            await updateKV(`subscriber:${customer_email}`, {
              email: customer_email,
              status: "active",
              planId: metadata?.planId,
              updatedAt: new Date().toISOString(),
            });
          }
        } else {
          console.log(`[NO-KV] Checkout completed:`, JSON.stringify(record));
        }
        break;
      }

      case "subscription.active": {
        const { id, customer_email, metadata } = event.data.object;
        const record = {
          subscriptionId: id,
          email: customer_email,
          status: "active",
          planId: metadata?.planId,
          createdAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`subscription:${id}`, record);
          if (customer_email) {
            await updateKV(`subscriber:${customer_email}`, {
              email: customer_email,
              status: "active",
              planId: metadata?.planId,
              updatedAt: new Date().toISOString(),
            });
          }
        } else {
          console.log(`[NO-KV] Subscription active:`, JSON.stringify(record));
        }
        break;
      }

      case "subscription.canceled": {
        const { id, customer_email } = event.data.object;
        const record = {
          subscriptionId: id,
          email: customer_email,
          status: "cancelled",
          cancelledAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`subscription:${id}`, record);
          if (customer_email) {
            await updateKV(`subscriber:${customer_email}`, {
              email: customer_email,
              status: "cancelled",
              updatedAt: new Date().toISOString(),
            });
          }
        } else {
          console.log(`[NO-KV] Subscription cancelled:`, JSON.stringify(record));
        }
        break;
      }

      case "subscription.paid": {
        const { id, customer_email, amount } = event.data.object;
        const record = {
          paymentId: id,
          email: customer_email,
          amount,
          status: "succeeded",
          paidAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`payment:${id}`, record);
        } else {
          console.log(`[NO-KV] Subscription paid:`, JSON.stringify(record));
        }
        break;
      }

      case "subscription.past_due": {
        const { id, customer_email } = event.data.object;
        const record = {
          paymentId: id,
          email: customer_email,
          status: "past_due",
          failedAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`payment:${id}`, record);
        } else {
          console.log(`[NO-KV] Subscription past due:`, JSON.stringify(record));
        }
        break;
      }

      case "subscription.expired": {
        const { id, customer_email } = event.data.object;
        const record = {
          subscriptionId: id,
          email: customer_email,
          status: "expired",
          expiredAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`subscription:${id}`, record);
          if (customer_email) {
            await updateKV(`subscriber:${customer_email}`, {
              email: customer_email,
              status: "expired",
              updatedAt: new Date().toISOString(),
            });
          }
        } else {
          console.log(`[NO-KV] Subscription expired:`, JSON.stringify(record));
        }
        break;
      }

      case "refund.created": {
        const { id, customer_email, amount } = event.data.object;
        const record = {
          refundId: id,
          email: customer_email,
          amount,
          status: "refunded",
          refundedAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`refund:${id}`, record);
        } else {
          console.log(`[NO-KV] Refund created:`, JSON.stringify(record));
        }
        break;
      }

      case "dispute.created": {
        const { id, customer_email } = event.data.object;
        const record = {
          disputeId: id,
          email: customer_email,
          status: "disputed",
          disputedAt: new Date().toISOString(),
        };
        if (kvAvailable) {
          await updateKV(`dispute:${id}`, record);
        } else {
          console.log(`[NO-KV] Dispute created:`, JSON.stringify(record));
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // 始终返回 200，避免 Creem 无限重试
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    // 即使出错也返回 200，避免 Creem 重试（日志中已有记录）
    res.status(200).json({ received: true, warning: "Processing error, logged" });
  }
}
