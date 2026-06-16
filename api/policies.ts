// GET /api/policies - 获取政策列表，支持 category 和 search 查询参数

import type { VercelRequest, VercelResponse } from "../src/lib/types";
import { policies } from "../src/data/policies";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 仅允许 GET 请求
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { category, search } = req.query;

  let result = [...policies];

  // 按类别筛选
  if (category && typeof category === "string") {
    result = result.filter((p) => p.category === category);
  }

  // 按关键词搜索（搜索英文标题、中文标题、摘要）
  if (search && typeof search === "string") {
    const keyword = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.titleEn.toLowerCase().includes(keyword) ||
        p.titleZh.includes(search) ||
        p.summaryEn.toLowerCase().includes(keyword) ||
        p.city.toLowerCase().includes(keyword)
    );
  }

  // 按更新时间倒序排列
  result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  res.status(200).json({
    total: result.length,
    policies: result,
  });
}
