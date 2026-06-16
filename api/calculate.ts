// POST /api/calculate - 根据用户信息匹配政策并估算补贴金额

import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Policy, CalculateRequest, CalculateResponse, MatchedPolicy } from "../src/lib/types";
import { policies } from "../src/data/policies";

// 简单的规则匹配逻辑
function matchPolicy(
  policy: Policy,
  request: CalculateRequest
): MatchedPolicy | null {
  const { city, visaType, monthlyIncome, hasChildren, childrenAge, hasElderly, rentOrBuy } = request;
  const annualIncome = monthlyIncome * 12;

  // 城市匹配：National 政策全国适用，否则需匹配城市名
  const cityMatch =
    policy.city === "National" ||
    policy.city.toLowerCase().includes(city.toLowerCase()) ||
    city.toLowerCase().includes(policy.city.toLowerCase());

  // 根据政策 ID 进行规则匹配
  switch (policy.id) {
    case "individual-income-tax-deductions": {
      if (!cityMatch) return null;
      // 根据收入估算可用的扣除额
      let estimatedDeduction = 0;
      if (hasChildren) estimatedDeduction += 12000; // 子女教育
      if (childrenAge.some((age) => age < 3)) estimatedDeduction += 24000; // 婴幼儿照护
      if (hasElderly) estimatedDeduction += 24000; // 赡养老人
      if (rentOrBuy === "rent") estimatedDeduction += 18000; // 住房租金
      else estimatedDeduction += 12000; // 住房贷款利息
      const taxSaving = Math.round(estimatedDeduction * (annualIncome > 360000 ? 0.25 : 0.1));
      return {
        policy,
        estimatedAmount: `¥${taxSaving.toLocaleString()}/year in tax savings`,
        priority: taxSaving > 10000 ? "high" : taxSaving > 5000 ? "medium" : "low",
        matchReason: `Based on your income of ¥${monthlyIncome.toLocaleString()}/month, you can claim deductions for ${[hasChildren ? "children's education" : "", childrenAge.some((a) => a < 3) ? "infant care" : "", hasElderly ? "elderly care" : "", rentOrBuy === "rent" ? "housing rent" : "housing loan interest"].filter(Boolean).join(", ")}`,
      };
    }

    case "social-insurance-foreign-employees": {
      if (!cityMatch) return null;
      const employeeContribution = Math.round(monthlyIncome * 0.105);
      return {
        policy,
        estimatedAmount: `¥${employeeContribution.toLocaleString()}/month (employee share)`,
        priority: "high",
        matchReason: "Mandatory for all foreign employees with work permits",
      };
    }

    case "housing-provident-fund-expats": {
      if (!cityMatch) return null;
      const contribution = Math.round(monthlyIncome * 0.07); // 按7%估算
      return {
        policy,
        estimatedAmount: `¥${contribution.toLocaleString()}/month (matched by employer)`,
        priority: monthlyIncome > 15000 ? "high" : "medium",
        matchReason: "Voluntary enrollment can provide low-interest housing loans and rental withdrawal benefits",
      };
    }

    case "childcare-subsidy": {
      if (!hasChildren || !cityMatch) return null;
      const hasInfant = childrenAge.some((age) => age < 3);
      const estimatedSubsidy = hasInfant ? 3600 : 1900;
      return {
        policy,
        estimatedAmount: `¥${estimatedSubsidy.toLocaleString()}/year`,
        priority: "high",
        matchReason: `You have children and may qualify for childcare subsidies in ${city}`,
      };
    }

    case "home-appliance-trade-in-subsidy": {
      if (!cityMatch) return null;
      return {
        policy,
        estimatedAmount: "15-20% off, up to ¥2,000 per item",
        priority: "medium",
        matchReason: "Available to all residents with valid residence permits",
      };
    }

    case "new-energy-vehicle-subsidy": {
      if (!cityMatch) return null;
      const taxSaving = Math.round(Math.min(annualIncome * 0.1, 30000));
      return {
        policy,
        estimatedAmount: `Purchase tax exemption saves ~¥${taxSaving.toLocaleString()}`,
        priority: "medium",
        matchReason: "NEV purchase tax exemption and city-specific license plate benefits apply",
      };
    }

    case "talent-housing-subsidy": {
      if (!cityMatch) return null;
      const subsidy = monthlyIncome > 30000 ? 3000 : monthlyIncome > 20000 ? 2000 : 1000;
      return {
        policy,
        estimatedAmount: `¥${subsidy.toLocaleString()}/month`,
        priority: monthlyIncome > 20000 ? "high" : "medium",
        matchReason: `Your income level may qualify for talent housing subsidies in ${city}`,
      };
    }

    case "medical-insurance-foreign-residents": {
      if (!cityMatch) return null;
      return {
        policy,
        estimatedAmount: "Up to 90% reimbursement of covered medical expenses",
        priority: "high",
        matchReason: "Essential coverage for all foreign residents",
      };
    }

    case "education-subsidy-children-expats": {
      if (!hasChildren || !cityMatch) return null;
      return {
        policy,
        estimatedAmount: "¥1,000/month tax deduction + possible city subsidies",
        priority: "high",
        matchReason: `Your children may qualify for education benefits in ${city}`,
      };
    }

    case "startup-subsidy-foreign-entrepreneurs": {
      if (!cityMatch) return null;
      if (visaType === "R-visa" || visaType === "entrepreneur") {
        return {
          policy,
          estimatedAmount: "¥50,000 - ¥500,000 one-time grant",
          priority: "high",
          matchReason: "Your visa type qualifies for startup subsidies",
        };
      }
      return {
        policy,
        estimatedAmount: "¥50,000 - ¥500,000 one-time grant (if eligible)",
        priority: "low",
        matchReason: "Available if you transition to an entrepreneur visa and register in an innovation zone",
      };
    }

    case "foreign-talent-visa-r-visa": {
      if (!cityMatch) return null;
      if (visaType === "R-visa") {
        const taxSaving = Math.round(annualIncome * 0.15);
        return {
          policy,
          estimatedAmount: `¥${taxSaving.toLocaleString()}/year in tax savings on allowances`,
          priority: "high",
          matchReason: "R-visa holders enjoy tax exemptions on housing and education allowances",
        };
      }
      return {
        policy,
        estimatedAmount: "¥30,000 - ¥100,000+/year in potential tax savings",
        priority: monthlyIncome > 40000 ? "medium" : "low",
        matchReason: "Consider upgrading to R-visa for significant tax benefits",
      };
    }

    case "elderly-care-deduction": {
      if (!hasElderly || !cityMatch) return null;
      const deduction = 24000; // 独生子女标准
      const taxSaving = Math.round(deduction * (annualIncome > 360000 ? 0.25 : 0.1));
      return {
        policy,
        estimatedAmount: `¥${taxSaving.toLocaleString()}/year in tax savings`,
        priority: taxSaving > 5000 ? "high" : "medium",
        matchReason: "You can claim elderly care deduction for supporting parents over 60",
      };
    }

    case "rental-housing-deduction": {
      if (rentOrBuy !== "rent" || !cityMatch) return null;
      const deduction = 18000; // 一线城市
      const taxSaving = Math.round(deduction * (annualIncome > 360000 ? 0.25 : 0.1));
      return {
        policy,
        estimatedAmount: `¥${taxSaving.toLocaleString()}/year in tax savings`,
        priority: taxSaving > 3000 ? "high" : "medium",
        matchReason: "You can deduct rental expenses from your taxable income",
      };
    }

    case "infant-care-deduction": {
      if (!hasChildren || !childrenAge.some((age) => age < 3) || !cityMatch) return null;
      const infantCount = childrenAge.filter((age) => age < 3).length;
      const deduction = 24000 * infantCount;
      const taxSaving = Math.round(deduction * (annualIncome > 360000 ? 0.25 : 0.1));
      return {
        policy,
        estimatedAmount: `¥${taxSaving.toLocaleString()}/year in tax savings`,
        priority: "high",
        matchReason: `You have ${infantCount} child(ren) under 3, qualifying for infant care deduction`,
      };
    }

    case "continuing-education-deduction": {
      if (!cityMatch) return null;
      return {
        policy,
        estimatedAmount: "¥400/month or ¥3,600/year in deductions",
        priority: "low",
        matchReason: "Available if you pursue further education or professional certifications in China",
      };
    }

    case "green-card-permanent-residence": {
      if (!cityMatch) return null;
      return {
        policy,
        estimatedAmount: "Full citizen-equivalent benefits",
        priority: "medium",
        matchReason: "Consider applying for permanent residence for long-term benefits",
      };
    }

    case "shanghai-lingang-special-policy": {
      if (!city.toLowerCase().includes("shanghai") && !city.toLowerCase().includes("lingang")) return null;
      const taxSaving = Math.round(annualIncome * 0.3); // 估算个税差额
      return {
        policy,
        estimatedAmount: `IIT subsidy saving ~¥${taxSaving.toLocaleString()}/year + housing subsidies`,
        priority: "high",
        matchReason: "Working in Lingang can reduce your effective tax rate to 15%",
      };
    }

    case "hainan-free-trade-port-tax": {
      if (!city.toLowerCase().includes("hainan") && !city.toLowerCase().includes("haikou") && !city.toLowerCase().includes("sanya")) return null;
      const taxSaving = Math.round(annualIncome * 0.3);
      return {
        policy,
        estimatedAmount: `IIT capped at 15%, saving ~¥${taxSaving.toLocaleString()}/year`,
        priority: "high",
        matchReason: "Hainan FTP offers the lowest personal income tax rate in China",
      };
    }

    default: {
      // 通用匹配：城市匹配则返回低优先级
      if (!cityMatch) return null;
      return {
        policy,
        estimatedAmount: policy.amount,
        priority: "low",
        matchReason: "This policy may be relevant to your situation",
      };
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body as CalculateRequest;

  // 参数校验
  if (!body.city || !body.visaType || !body.monthlyIncome) {
    res.status(400).json({
      error: "Missing required fields: city, visaType, monthlyIncome",
    });
    return;
  }

  const request: CalculateRequest = {
    city: body.city,
    visaType: body.visaType,
    monthlyIncome: Number(body.monthlyIncome),
    hasChildren: body.hasChildren ?? false,
    childrenAge: body.childrenAge ?? [],
    hasElderly: body.hasElderly ?? false,
    rentOrBuy: body.rentOrBuy ?? "rent",
  };

  // 匹配所有政策
  const matchedPolicies: MatchedPolicy[] = [];
  for (const policy of policies) {
    const match = matchPolicy(policy, request);
    if (match) {
      matchedPolicies.push(match);
    }
  }

  // 按优先级排序：high > medium > low
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  matchedPolicies.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // 生成总结
  const highCount = matchedPolicies.filter((m) => m.priority === "high").length;
  const mediumCount = matchedPolicies.filter((m) => m.priority === "medium").length;
  const summary = `Based on your profile, we found ${matchedPolicies.length} relevant policies: ${highCount} high-priority and ${mediumCount} medium-priority. You could potentially save thousands of yuan annually through tax deductions, subsidies, and benefits.`;

  const response: CalculateResponse = {
    matchedPolicies,
    totalEstimatedSavings: "Varies by policy combination",
    summary,
  };

  res.status(200).json(response);
}
