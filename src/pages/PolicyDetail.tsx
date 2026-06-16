import { Link, useParams } from 'react-router-dom'
import { ChevronRight, CheckCircle, ExternalLink, Lock, Calendar } from 'lucide-react'

/* 政策详情模拟数据 */
const policyData: Record<string, {
  title: string; category: string; updated: string; summary: string;
  detail: string; eligibility: string[]; benefit: string; source: string;
  toc: string[];
}> = {
  '1': {
    title: 'Individual Income Tax Deductions',
    category: 'Tax', updated: '2025-12-01',
    summary: 'Foreign workers in China may qualify for several income tax deductions that can significantly reduce their monthly tax burden. Understanding these deductions is essential for maximizing take-home pay.',
    detail: 'China\'s individual income tax system allows various deductions including housing rental, continuing education, and dependent support. Foreign residents who have lived in China for over 183 days in a tax year are considered tax residents and can claim these deductions. The standard basic deduction is ¥60,000/year. Additional special deductions cover social insurance contributions, housing provident fund, and qualified donations.',
    eligibility: [
      'Hold a valid work permit (Z visa or work-type residence permit)',
      'Have resided in China for 183+ days in the tax year',
      'Earn employment income from a Chinese entity',
      'File annual tax reconciliation on time',
    ],
    benefit: 'Up to ¥60,000/year in basic deductions plus additional special deductions for housing, education, and dependents.',
    source: 'https://www.chinatax.gov.cn',
    toc: ['Summary', 'Details', 'Eligibility', 'Benefits', 'Official Source'],
  },
}

const categoryColor: Record<string, string> = {
  Tax: 'bg-blue-100 text-blue-700',
  Housing: 'bg-green-100 text-green-700',
  Medical: 'bg-red-100 text-red-700',
  Education: 'bg-purple-100 text-purple-700',
  'Social Insurance': 'bg-amber-100 text-amber-700',
  Childcare: 'bg-pink-100 text-pink-700',
}

/* 付费墙状态模拟 - 默认未订阅 */
const isSubscribed = false

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>()
  const policy = policyData[id ?? '1'] ?? policyData['1']

  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* 面包屑导航 */}
        <nav className="flex items-center gap-1 text-sm text-navy-400">
          <Link to="/" className="hover:text-gold-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/policies" className="hover:text-gold-600">Policies</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy-700">{policy.title}</span>
        </nav>

        <div className="mt-8 flex gap-8">
          {/* 主内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold text-navy-700">{policy.title}</h1>
              <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColor[policy.category] ?? 'bg-gray-100 text-gray-700'}`}>
                {policy.category}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1 text-sm text-navy-400">
              <Calendar className="h-4 w-4" /> Last updated: {policy.updated}
            </p>

            {/* 摘要 */}
            <section id="summary" className="mt-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-navy-700">Summary</h2>
              <p className="mt-3 text-navy-600 leading-relaxed">{policy.summary}</p>
            </section>

            {/* 付费墙提示 */}
            {!isSubscribed && (
              <div className="mt-6 rounded-lg border-2 border-gold-500 bg-gold-50 p-6 text-center">
                <Lock className="mx-auto h-8 w-8 text-gold-600" />
                <h3 className="mt-3 font-heading text-lg font-bold text-navy-700">Unlock Full Guide</h3>
                <p className="mt-1 text-sm text-navy-500">Subscribe to Pro to access the complete policy guide with application steps.</p>
                <Link
                  to="/pricing"
                  className="mt-4 inline-block rounded-lg bg-gold-500 px-6 py-2 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
                >
                  Upgrade to Pro
                </Link>
              </div>
            )}

            {isSubscribed && (
              <>
                {/* 详情 */}
                <section id="details" className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-navy-700">Details</h2>
                  <p className="mt-3 text-navy-600 leading-relaxed">{policy.detail}</p>
                </section>

                {/* 资格条件 */}
                <section id="eligibility" className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-navy-700">Eligibility</h2>
                  <ul className="mt-3 space-y-2">
                    {policy.eligibility.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-navy-600">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 金额/福利 */}
                <section id="benefits" className="mt-6 rounded-lg border-2 border-gold-400 bg-gold-50 p-6">
                  <h2 className="font-heading text-xl font-bold text-navy-700">Amount / Benefit</h2>
                  <p className="mt-3 text-lg font-semibold text-gold-700">{policy.benefit}</p>
                </section>

                {/* 官方来源 */}
                <section id="source" className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-navy-700">Official Source</h2>
                  <a
                    href={policy.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-gold-600 hover:underline"
                  >
                    View Official Document <ExternalLink className="h-4 w-4" />
                  </a>
                </section>
              </>
            )}
          </div>

          {/* 侧边栏目录（仅桌面端） */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 rounded-lg bg-white p-4 shadow-sm">
              <h4 className="font-heading text-sm font-bold text-navy-700">Table of Contents</h4>
              <ul className="mt-3 space-y-2">
                {policy.toc.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-navy-500 transition-colors hover:text-gold-600"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
