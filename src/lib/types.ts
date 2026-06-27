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
