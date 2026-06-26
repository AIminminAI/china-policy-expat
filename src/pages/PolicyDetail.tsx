import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, CheckCircle, ExternalLink, Calendar, Loader2, Coffee } from 'lucide-react'
import { policies, policyCategories } from '../data/policies'

const categoryColor: Record<string, string> = {
  'Tax & Finance': 'bg-blue-100 text-blue-700',
  'Social Insurance': 'bg-amber-100 text-amber-700',
  'Housing': 'bg-green-100 text-green-700',
  'Healthcare': 'bg-red-100 text-red-700',
  'Education': 'bg-purple-100 text-purple-700',
  'Subsidies & Benefits': 'bg-cyan-100 text-cyan-700',
  'Entrepreneurship': 'bg-orange-100 text-orange-700',
  'Transportation': 'bg-indigo-100 text-indigo-700',
  'Elderly Care': 'bg-teal-100 text-teal-700',
  'Childcare': 'bg-pink-100 text-pink-700',
}

interface PolicyDetail {
  id: string
  titleEn: string
  category: string
  summaryEn: string
  city: string
  updatedAt: string
  pro: boolean
  detailEn: string | null
  eligibilityEn: string[] | null
  amount: string | null
  source: string | null
  sourceUrl: string | null
}

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>()
  const policy = policies.find((p) => p.id === id)
  const [detail, setDetail] = useState<PolicyDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/policy-detail?id=${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(data => {
        setDetail(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  if (!policy) {
    return (
      <div className="bg-navy-50 min-h-screen py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy-700">Policy Not Found</h1>
          <p className="mt-4 text-navy-500">The policy you are looking for does not exist.</p>
          <Link to="/policies" className="mt-6 inline-block rounded-lg bg-gold-500 px-6 py-2 font-semibold text-navy-800 hover:bg-gold-400">
            Browse All Policies
          </Link>
        </div>
      </div>
    )
  }

  const categoryLabel = policyCategories[policy.category] ?? policy.category
  const toc = [
    { label: 'Summary', anchor: 'summary' },
    { label: 'Details', anchor: 'details' },
    { label: 'Eligibility', anchor: 'eligibility' },
    { label: 'Benefits', anchor: 'benefits' },
    { label: 'Official Source', anchor: 'source' },
  ]

  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* 面包屑导航 */}
        <nav className="flex items-center gap-1 text-sm text-navy-400">
          <Link to="/" className="hover:text-gold-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/policies" className="hover:text-gold-600">Policies</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy-700">{policy.titleEn}</span>
        </nav>

        <div className="mt-8 flex gap-8">
          {/* 主内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl font-bold text-navy-700">{policy.titleEn}</h1>
              <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColor[categoryLabel] ?? 'bg-gray-100 text-gray-700'}`}>
                {categoryLabel}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1 text-sm text-navy-400">
              <Calendar className="h-4 w-4" /> Last updated: {policy.updatedAt}
            </p>

            {/* 摘要 */}
            <section id="summary" className="mt-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-navy-700">Summary</h2>
              <p className="mt-3 text-navy-600 leading-relaxed">{policy.summaryEn}</p>
            </section>

            {/* 加载中 */}
            {loading && (
              <div className="mt-6 flex items-center justify-center rounded-lg bg-white p-6 shadow-sm">
                <Loader2 className="h-6 w-6 animate-spin text-gold-500" />
                <span className="ml-2 text-navy-500">Loading details...</span>
              </div>
            )}

            {/* 详情内容 - 完全免费 */}
            {!loading && detail && (
              <>
                {detail.detailEn && (
                  <section id="details" className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="font-heading text-xl font-bold text-navy-700">Details</h2>
                    <p className="mt-3 text-navy-600 leading-relaxed whitespace-pre-line">{detail.detailEn}</p>
                  </section>
                )}

                {detail.eligibilityEn && (
                  <section id="eligibility" className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="font-heading text-xl font-bold text-navy-700">Eligibility</h2>
                    <ul className="mt-3 space-y-2">
                      {detail.eligibilityEn.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-navy-600">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {detail.amount && (
                  <section id="benefits" className="mt-6 rounded-lg border-2 border-gold-400 bg-gold-50 p-6">
                    <h2 className="font-heading text-xl font-bold text-navy-700">Amount / Benefit</h2>
                    <p className="mt-3 text-lg font-semibold text-gold-700">{detail.amount}</p>
                  </section>
                )}

                {detail.sourceUrl && (
                  <section id="source" className="mt-6 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="font-heading text-xl font-bold text-navy-700">Official Source</h2>
                    {detail.source && <p className="mt-2 text-sm text-navy-500">{detail.source}</p>}
                    <a
                      href={detail.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-gold-600 hover:underline"
                    >
                      View Official Document <ExternalLink className="h-4 w-4" />
                    </a>
                  </section>
                )}
              </>
            )}

            {/* 打赏提示 */}
            {!loading && (
              <div className="mt-8 rounded-lg border-2 border-gold-300 bg-gold-50 p-6 text-center">
                <Coffee className="mx-auto h-8 w-8 text-gold-600" />
                <h3 className="mt-2 font-heading text-lg font-bold text-navy-700">Found this helpful?</h3>
                <p className="mt-1 text-sm text-navy-500">All content is free. If this saved you money, consider buying us a coffee.</p>
                <Link
                  to="/support"
                  className="mt-3 inline-block rounded-lg bg-gold-500 px-6 py-2 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
                >
                  Support Us
                </Link>
              </div>
            )}
          </div>

          {/* 侧边栏目录 */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 rounded-lg bg-white p-4 shadow-sm">
              <h4 className="font-heading text-sm font-bold text-navy-700">Table of Contents</h4>
              <ul className="mt-3 space-y-2">
                {toc.map((item) => (
                  <li key={item.anchor}>
                    <a
                      href={`#${item.anchor}`}
                      className="text-sm text-navy-500 transition-colors hover:text-gold-600"
                    >
                      {item.label}
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
