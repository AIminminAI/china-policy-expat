import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, FileText, MapPin, ArrowRight, Calculator } from 'lucide-react'
import { policies, policyCategories } from '../data/policies'

/* 热门政策 - 使用真实数据的前6条 */
const popularPolicies = policies.slice(0, 6).map((p) => ({
  id: p.id,
  category: policyCategories[p.category] ?? p.category,
  title: p.titleEn,
  summary: p.summaryEn,
}))

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

const stats = [
  { icon: FileText, value: '23', label: 'Policies' },
  { icon: MapPin, value: '10', label: 'Cities' },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/policies?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/policies')
    }
  }

  return (
    <>
      {/* Hero 区域 */}
      <section className="bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
            Know Your Benefits in China
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-200">
            The only English guide to Chinese government subsidies, tax benefits, and social insurance for foreigners
          </p>

          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policies, benefits, cities..."
                className="w-full rounded-l-lg border-2 border-r-0 border-navy-500 bg-white py-3 pl-10 pr-4 text-navy-700 placeholder-navy-300 focus:border-gold-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-r-lg bg-gold-500 px-6 py-3 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
            >
              Search
            </button>
          </form>

          {/* 统计卡片 */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-white/10 backdrop-blur px-4 py-5">
                <s.icon className="mx-auto h-7 w-7 text-gold-400" />
                <p className="mt-2 text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-navy-200">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 热门政策 */}
      <section className="py-16 bg-navy-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-center text-navy-700">
            Popular Policies
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularPolicies.map((p) => (
              <Link
                key={p.id}
                to={`/policies/${p.id}`}
                className="group rounded-lg border-2 border-transparent bg-white p-6 shadow-sm transition-all hover:border-gold-500 hover:shadow-md"
              >
                <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColor[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {p.category}
                </span>
                <h3 className="mt-3 font-heading text-lg font-bold text-navy-700 group-hover:text-gold-600">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500">{p.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 计算器引导 */}
      <section className="bg-navy-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <Calculator className="mx-auto h-10 w-10 text-gold-400" />
          <h2 className="mt-4 font-heading text-3xl font-bold">Find Your Benefits in 30 Seconds</h2>
          <p className="mx-auto mt-3 max-w-lg text-navy-200">
            Answer a few questions and get a personalized list of subsidies and tax savings you may qualify for.
          </p>
          <Link
            to="/calculator"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-8 py-3 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
          >
            Try the Calculator <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
