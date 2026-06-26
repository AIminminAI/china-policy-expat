import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Clock } from 'lucide-react'
import { policies, policyCategories } from '../data/policies'

const categories = ['All', 'Tax & Finance', 'Social Insurance', 'Housing', 'Healthcare', 'Education', 'Subsidies & Benefits', 'Entrepreneurship', 'Transportation', 'Elderly Care', 'Childcare'] as const

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

export default function Policies() {
  const [searchParams] = useSearchParams()
  const [active, setActive] = useState<string>('All')
  const [keyword, setKeyword] = useState(searchParams.get('q') || '')

  // 从 URL 参数同步搜索关键词
  useEffect(() => {
    const q = searchParams.get('q')
    if (q !== null) {
      setKeyword(q)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    return policies.filter((p) => {
      const categoryLabel = policyCategories[p.category] ?? p.category
      const matchCat = active === 'All' || categoryLabel === active
      const matchKey = !keyword ||
        p.titleEn.toLowerCase().includes(keyword.toLowerCase()) ||
        p.summaryEn.toLowerCase().includes(keyword.toLowerCase()) ||
        p.city.toLowerCase().includes(keyword.toLowerCase())
      return matchCat && matchKey
    })
  }, [active, keyword])

  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-navy-700">Policies</h1>

        {/* 搜索栏 */}
        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-300" />
          <input
            type="text"
            placeholder="Search by keyword, city..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white py-2.5 pl-10 pr-4 text-navy-700 placeholder-navy-300 focus:border-gold-500 focus:outline-none"
          />
        </div>

        {/* 分类标签 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                active === cat
                  ? 'bg-navy-700 text-white'
                  : 'bg-white text-navy-600 hover:bg-navy-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 政策列表 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const categoryLabel = policyCategories[p.category] ?? p.category
            return (
              <Link
                key={p.id}
                to={`/policies/${p.id}`}
                className="group rounded-lg border-2 border-transparent bg-white p-5 shadow-sm transition-all hover:border-gold-500 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColor[categoryLabel] ?? 'bg-gray-100 text-gray-700'}`}>
                    {categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-navy-400">
                    <Clock className="h-3.5 w-3.5" /> {p.city}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-navy-700 group-hover:text-gold-600">
                  {p.titleEn}
                </h3>
                <p className="mt-2 text-sm text-navy-500">{p.summaryEn}</p>
              </Link>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-navy-400">No policies found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
