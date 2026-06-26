// 政策相关类型定义

export type PolicyCategory =
  | "tax"
  | "social-insurance"
  | "housing"
  | "healthcare"
  | "education"
  | "subsidy"
  | "entrepreneurship"
  | "transportation"
  | "elderly-care"
  | "childcare";

export interface Policy {
  id: string;
  titleEn: string;
  titleZh: string;
  category: PolicyCategory;
  summaryEn: string;
  detailEn?: string;
  eligibilityEn?: string[];
  amount?: string;
  source?: string;
  sourceUrl?: string;
  city: string;
  updatedAt: string;
}

export interface CalculateRequest {
  city: string;
  visaType: string;
  monthlyIncome: number;
  hasChildren: boolean;
  childrenAge: number[];
  hasElderly: boolean;
  rentOrBuy: "rent" | "buy";
}

export interface MatchedPolicy {
  policy: Policy;
  estimatedAmount: string;
  priority: "high" | "medium" | "low";
  matchReason: string;
}

export interface CalculateResponse {
  matchedPolicies: MatchedPolicy[];
  totalEstimatedSavings: string;
  summary: string;
}

export interface CheckoutRequest {
  planId: string;
  email: string;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
}

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

// Creem webhook 事件类型
export interface CreemWebhookEvent {
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

// Vercel serverless function 类型
export interface VercelRequest {
  method: string;
  query: Record<string, string | string[] | undefined>;
  body: unknown;
  headers: Record<string, string | undefined>;
}

export interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  send: (body: string) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}
