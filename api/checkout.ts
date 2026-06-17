// POST /api/checkout - 创建 Creem 结账会话

import type { VercelRequest, VercelResponse } from "@vercel/node";

interface CheckoutRequest {
  planId: string;
  email: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as CheckoutRequest;

  if (!body.planId || !body.email) {
    res.status(400).json({ error: "Missing required fields: planId, email" });
    return;
  }

  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    console.error("CREEM_API_KEY is not configured");
    res.status(500).json({ error: "Payment service not configured" });
    return;
  }

  try {
    // 调用 Creem API 创建结账会话
    const response = await fetch("https://api.creem.io/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        plan_id: body.planId,
        customer_email: body.email,
        success_url: `${process.env.NEXT_PUBLIC_URL || "https://chinapolicyguide.com"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL || "https://chinapolicyguide.com"}/pricing`,
        metadata: {
          email: body.email,
          planId: body.planId,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Creem API error:", errorData);
      res.status(502).json({ error: "Failed to create checkout session" });
      return;
    }

    const session = await response.json();

    res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
