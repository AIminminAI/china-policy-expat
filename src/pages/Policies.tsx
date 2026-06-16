import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock } from 'lucide-react'

const categories = ['All', 'Tax', 'Housing', 'Medical', 'Education', 'Social Insurance', 'Childcare'] as const

/* 政策模拟数据 */
const allPolicies = [
  { id: '1', category: 'Tax', title: 'Individual Income Tax Deductions', summary: 'Key deductions available to foreign workers on employment income.', time: '5 min' },
  { id: '2', category: 'Housing', title: 'Housing Provident Fund for Expats', summary: 'How to enroll and withdraw from the housing fund as a foreigner.', time: '4 min' },
  { id: '3', category: 'Medical', title: 'Social Medical Insurance Guide', summary: 'Coverage, hospitals, and reimbursement for expat residents.', time: '6 min' },
  { id: '4', category: 'Education', title: 'Children Education Subsidies', summary: 'School enrollment and tuition support for expat families.', time: '5 min' },
  { id: '5', category: 'Social Insurance', title: 'Five Insurances Explained', summary: 'Complete breakdown of mandatory social insurance contributions.', time: '7 min' },
  { id: '6', category: 'Childcare', title: 'Maternity & Paternity Benefits', summary: 'Leave entitlements and allowances for new parents in China.', time: '4 min' },
  { id: '7', category: 'Tax', title: 'Annual Tax Reconciliation', summary: 'Step-by-step guide to filing your annual tax return in China.', time: '6 min' },
  { id: '8', category: 'Housing', title: 'Rental Subsidy Programs', summary: 'City-specific rental subsidies available to qualified expats.', time: '3 min' },
  { id: '9', category: 'Medical', title: 'Cross-border Medical Coverage', summary: 'Using Chinese insurance for medical treatment abroad.', time: '5 min' },
  { id: '10', category: 'Education', title: 'University Tuition Waivers', summary: 'Tuition reduction programs at Chinese universities for foreign students.', time: '4 min' },
  { id: '11', category: 'Social Insurance', title: 'Pension Withdrawal on Exit', summary: 'How to claim your pension contributions when leaving China.', time: '5 min' },
  { id: '12', category: 'Childcare', title: 'Daycare Voucher Programs', summary: 'Subsidized childcare vouchers in major Chinese cities.', time: '3 min' },
]

const categoryColor: Record<string, string> = {
  Tax: 'bg-blue-100 text-blue-700',
  Housing: 'bg-green-100 text-green-700',
  Medical: 'bg-red-100 text-red-700',
  Education: 'bg-purple-100 text-purple-700',
  'Social Insurance': 'bg-amber-100 text-amber-700',
  Childcare: 'bg-pink-100 text-pink-700',
}

export default function Policies() {
  const [active, setActive] = useState<string>('All')
  const [keyword, setKeyword] = useState('')

  const filtered = useMemo(() => {
    return allPolicies.filter((p) => {
      const matchCat = active === 'All' || p.category === active
      const matchKey = !keyword || p.title.toLowerCase().includes(keyword.toLowerCase()) || p.summary.toLowerCase().includes(keyword.toLowerCase())
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
            placeholder="Search by keyword..."
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
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/policies/${p.id}`}
              className="group rounded-lg border-2 border-transparent bg-white p-5 shadow-sm transition-all hover:border-gold-500 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${categoryColor[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {p.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-navy-400">
                  <Clock className="h-3.5 w-3.5" /> {p.time}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-navy-700 group-hover:text-gold-600">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-navy-500">{p.summary}</p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-navy-400">No policies found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
