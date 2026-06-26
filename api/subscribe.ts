// POST /api/subscribe - 邮件订阅接口

import type { VercelRequest, VercelResponse } from "@vercel/node";

// 从环境变量获取 KV 配置（支持 KV_REST_API_URL 和 REDIS_URL 两种格式）
function getKVConfig(): { url: string; token: string } | null {
  // 优先使用 KV_REST_API_URL + KV_REST_API_TOKEN
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  if (kvUrl && kvToken) {
    return { url: kvUrl, token: kvToken };
  }

  // 从 REDIS_URL 解析（格式: redis:// 或 rediss://default:PASSWORD@HOST:PORT）
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

async function setKV(key: string, value: Record<string, unknown>): Promise<boolean> {
  const config = getKVConfig();
  if (!config) {
    console.error("KV not configured, cannot store subscriber");
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

async function getKV(key: string): Promise<Record<string, unknown> | null> {
  const config = getKVConfig();
  if (!config) {
    return null;
  }

  try {
    const response = await fetch(`${config.url}/get/${key}`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.result ? JSON.parse(data.result) : null;
  } catch {
    return null;
  }
}

// 简单的邮箱格式验证
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email } = req.body as { email?: string };

  if (!email || !isValidEmail(email)) {
    res.status(400).json({ error: "Valid email address is required" });
    return;
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    // 检查是否已订阅
    const existing = await getKV(`newsletter:${normalizedEmail}`);
    if (existing && existing.status === "active") {
      res.status(200).json({
        success: true,
        message: "You are already subscribed!",
      });
      return;
    }

    // 存储订阅信息（使用 newsletter: 前缀，与付费订阅 subscriber: 区分）
    const stored = await setKV(`newsletter:${normalizedEmail}`, {
      email: normalizedEmail,
      status: "active",
      source: "website",
      subscribedAt: new Date().toISOString(),
    });

    if (!stored) {
      res.status(503).json({
        error: "Subscription service is temporarily unavailable. Please try again later.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully subscribed! You'll receive policy updates and tips.",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
}
