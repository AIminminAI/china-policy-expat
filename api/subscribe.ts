// POST /api/subscribe - 邮件订阅接口

import type { VercelRequest, VercelResponse } from "../src/lib/types";

// KV 存储操作
async function setKV(key: string, value: Record<string, unknown>): Promise<void> {
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

async function getKV(key: string): Promise<Record<string, unknown> | null> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    return null;
  }

  try {
    const response = await fetch(`${kvUrl}/get/${key}`, {
      headers: {
        Authorization: `Bearer ${kvToken}`,
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
    const existing = await getKV(`subscriber:${normalizedEmail}`);
    if (existing && existing.status === "active") {
      res.status(200).json({
        success: true,
        message: "You are already subscribed!",
      });
      return;
    }

    // 存储订阅信息
    await setKV(`subscriber:${normalizedEmail}`, {
      email: normalizedEmail,
      status: "active",
      source: "website",
      subscribedAt: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "Successfully subscribed! You'll receive policy updates and tips.",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ error: "Failed to subscribe. Please try again." });
  }
}
