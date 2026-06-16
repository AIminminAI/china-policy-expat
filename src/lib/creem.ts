// 客户端 Creem 支付辅助函数

import type { CheckoutResponse } from "./types";

/**
 * 跳转到 Creem 结账页面
 * @param planId - Creem 计划 ID
 * @param email - 用户邮箱
 */
export async function redirectToCheckout(
  planId: string,
  email: string
): Promise<void> {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planId, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create checkout session");
    }

    const data: CheckoutResponse = await response.json();

    // 跳转到 Creem 结账页面
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
}

/**
 * 获取当前页面 URL 的查询参数中的 session_id
 * 用于结账成功后的回调页面
 */
export function getCheckoutSessionId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("session_id");
}
