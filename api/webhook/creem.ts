// POST /api/webhook/creem - 处理 Creem webhook 事件

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

interface CreemWebhookEvent {
  id: string;
  type: "checkout.completed" | "subscription.created" | "subscription.cancelled" | "payment.succeeded" | "payment.failed";
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

// KV 存储操作（使用 Vercel KV REST API）
async function updateKV(key: string, value: Record<string, unknown>): Promise<void> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    console.warn("KV not configured, skipping storage");
    return;
  }

  try {
    await fetch(`${kvUrl}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
  } catch (error) {
    console.error("KV write error:", error);
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
  const signature = req.headers["x-creem-signature"] as string;
  const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

  if (!signature || !verifySignature(rawBody, signature, webhookSecret)) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  const event = req.body as CreemWebhookEvent;

  try {
    switch (event.type) {
      case "checkout.completed": {
        const { id, customer_email, amount, currency, status, metadata } = event.data.object;
        // 存储购买记录到 KV
        await updateKV(`purchase:${id}`, {
          sessionId: id,
          email: customer_email,
          amount,
          currency,
          status,
          planId: metadata?.planId,
          completedAt: new Date().toISOString(),
        });
        // 更新用户订阅状态
        if (customer_email) {
          await updateKV(`subscriber:${customer_email}`, {
            email: customer_email,
            status: "active",
            planId: metadata?.planId,
            updatedAt: new Date().toISOString(),
          });
        }
        console.log(`Checkout completed: ${id} for ${customer_email}`);
        break;
      }

      case "subscription.created": {
        const { id, customer_email, metadata } = event.data.object;
        await updateKV(`subscription:${id}`, {
          subscriptionId: id,
          email: customer_email,
          status: "active",
          planId: metadata?.planId,
          createdAt: new Date().toISOString(),
        });
        console.log(`Subscription created: ${id} for ${customer_email}`);
        break;
      }

      case "subscription.cancelled": {
        const { id, customer_email } = event.data.object;
        await updateKV(`subscription:${id}`, {
          subscriptionId: id,
          email: customer_email,
          status: "cancelled",
          cancelledAt: new Date().toISOString(),
        });
        if (customer_email) {
          await updateKV(`subscriber:${customer_email}`, {
            email: customer_email,
            status: "cancelled",
            updatedAt: new Date().toISOString(),
          });
        }
        console.log(`Subscription cancelled: ${id} for ${customer_email}`);
        break;
      }

      case "payment.succeeded": {
        const { id, customer_email, amount } = event.data.object;
        await updateKV(`payment:${id}`, {
          paymentId: id,
          email: customer_email,
          amount,
          status: "succeeded",
          paidAt: new Date().toISOString(),
        });
        console.log(`Payment succeeded: ${id} for ${customer_email}`);
        break;
      }

      case "payment.failed": {
        const { id, customer_email } = event.data.object;
        await updateKV(`payment:${id}`, {
          paymentId: id,
          email: customer_email,
          status: "failed",
          failedAt: new Date().toISOString(),
        });
        console.log(`Payment failed: ${id} for ${customer_email}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
