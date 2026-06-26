// /api/checkout - 创建 Creem 结账会话 (POST) 或查询结账状态 (GET)

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface CheckoutRequest {
  planId: string;
  email: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    console.error("CREEM_API_KEY is not configured");
    res.status(500).json({ error: "Payment service not configured" });
    return;
  }

  // GET: 查询结账会话状态
  if (req.method === "GET") {
    const { session_id } = req.query;
    if (!session_id || typeof session_id !== "string") {
      res.status(400).json({ error: "session_id parameter is required" });
      return;
    }

    try {
      const response = await fetch(
        `https://api.creem.io/v1/checkouts?checkout_id=${encodeURIComponent(session_id)}`,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Creem checkout lookup error:", response.status, errorData.substring(0, 200));
        res.status(502).json({ error: "Failed to lookup checkout session" });
        return;
      }

      const data = await response.json();
      res.status(200).json({
        status: data.checkout?.status || "unknown",
        sessionId: data.checkout?.id,
        email: data.checkout?.customer_email,
      });
    } catch (error) {
      console.error("Checkout lookup error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    return;
  }

  // POST: 创建结账会话
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as CheckoutRequest;

  if (!body.planId || !body.email) {
    res.status(400).json({ error: "Missing required fields: planId, email" });
    return;
  }

  try {
    const response = await fetch("https://api.creem.io/v1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        product_id: body.planId,
        customer: {
          email: body.email,
        },
        success_url: `${process.env.NEXT_PUBLIC_URL || "https://china-policy-expat.vercel.app"}/success?plan_id=${body.planId}&session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          email: body.email,
          planId: body.planId,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Creem API error: status", response.status, errorData.substring(0, 200));
      res.status(502).json({ error: "Failed to create checkout session" });
      return;
    }

    const session = await response.json();

    res.status(200).json({
      url: session.checkout_url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
