import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Lock, AlertTriangle } from 'lucide-react'

const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou', 'Chengdu', 'Nanjing', 'Wuhan', 'Suzhou', 'Xiamen']
const visaTypes = ['Work (Z)', 'Student (X)', 'Talent (R)', 'Permanent (D)', 'Business (M)']

/* 付费墙状态模拟 */
const isSubscribed = false

/* 模拟计算结果 */
const mockResults = [
  { name: 'Housing Provident Fund Match', amount: '¥1,200/mo', priority: 'High' as const },
  { name: 'Individual Income Tax Deduction', amount: '¥800/mo', priority: 'High' as const },
  { name: 'Social Medical Insurance', amount: '¥500/mo', priority: 'Medium' as const },
  { name: 'Children Education Allowance', amount: '¥300/mo', priority: 'Low' as const },
]

const priorityStyle = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-green-100 text-green-700',
}

export default function Calculator() {
  const [step, setStep] = useState(0)
  const [city, setCity] = useState('')
  const [visa, setVisa] = useState('')
  const [income, setIncome] = useState(20000)
  const [housing, setHousing] = useState<'Rent' | 'Buy'>('Rent')
  const [hasChildren, setHasChildren] = useState(false)
  const [childAges, setChildAges] = useState('')
  const [hasElderly, setHasElderly] = useState(false)

  const canNext = () => {
    if (step === 0) return city !== '' && visa !== ''
    if (step === 1) return true
    return true
  }

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault() }

  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700 text-center">Subsidy Calculator</h1>
        <p className="mt-2 text-center text-navy-500">Find out which benefits you may be eligible for</p>

        {/* 进度条 */}
        {step < 3 && (
          <div className="mt-8 flex items-center gap-1">
            {[0, 1, 2].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-1">
                <div className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? 'bg-gold-500' : 'bg-navy-200'}`} />
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          {/* Step 1: 城市 + 签证类型 */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold text-navy-700">Step 1: Location & Visa</h2>
              <div>
                <label className="block text-sm font-semibold text-navy-600">City</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2.5 text-navy-700 focus:border-gold-500 focus:outline-none">
                  <option value="">Select a city</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-600">Visa Type</label>
                <select value={visa} onChange={(e) => setVisa(e.target.value)} className="mt-1 w-full rounded-lg border border-navy-200 px-3 py-2.5 text-navy-700 focus:border-gold-500 focus:outline-none">
                  <option value="">Select visa type</option>
                  {visaTypes.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: 收入 + 住房 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold text-navy-700">Step 2: Income & Housing</h2>
              <div>
                <label className="block text-sm font-semibold text-navy-600">Monthly Income (¥{income.toLocaleString()})</label>
                <input type="range" min={5000} max={100000} step={1000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="mt-2 w-full accent-gold-500" />
                <div className="flex justify-between text-xs text-navy-400"><span>¥5,000</span><span>¥100,000</span></div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-600">Housing</label>
                <div className="mt-1 flex gap-3">
                  {(['Rent', 'Buy'] as const).map((h) => (
                    <button key={h} type="button" onClick={() => setHousing(h)} className={`flex-1 rounded-lg border-2 py-2 font-semibold transition-colors ${housing === h ? 'border-gold-500 bg-gold-50 text-gold-700' : 'border-navy-200 text-navy-500'}`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 家庭 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold text-navy-700">Step 3: Family</h2>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-navy-600">
                  <input type="checkbox" checked={hasChildren} onChange={(e) => setHasChildren(e.target.checked)} className="accent-gold-500" />
                  Has Children
                </label>
                {hasChildren && (
                  <input type="text" value={childAges} onChange={(e) => setChildAges(e.target.value)} placeholder="Ages (e.g. 3, 7)" className="mt-2 w-full rounded-lg border border-navy-200 px-3 py-2 text-navy-700 focus:border-gold-500 focus:outline-none" />
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-navy-600">
                  <input type="checkbox" checked={hasElderly} onChange={(e) => setHasElderly(e.target.checked)} className="accent-gold-500" />
                  Has Elderly Dependents
                </label>
              </div>
            </div>
          )}

          {/* 结果页 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold text-navy-700">Your Estimated Benefits</h2>

              {!isSubscribed ? (
                <div className="rounded-lg border-2 border-gold-500 bg-gold-50 p-6 text-center">
                  <Lock className="mx-auto h-8 w-8 text-gold-600" />
                  <h3 className="mt-3 font-heading text-lg font-bold text-navy-700">Unlock Full Results</h3>
                  <p className="mt-1 text-sm text-navy-500">Pro subscribers see all eligible policies with estimated amounts.</p>
                  <Link to="/pricing" className="mt-4 inline-block rounded-lg bg-gold-500 px-6 py-2 font-semibold text-navy-800 hover:bg-gold-400">
                    Upgrade to Pro
                  </Link>
                </div>
              ) : (
                <>
                  {mockResults.map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-navy-50 p-4">
                      <div>
                        <p className="font-semibold text-navy-700">{r.name}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${priorityStyle[r.priority]}`}>
                          {r.priority} Priority
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gold-600">{r.amount}</p>
                    </div>
                  ))}
                  <div className="rounded-lg border-2 border-gold-400 bg-gold-50 p-4 text-center">
                    <p className="text-sm text-navy-500">Total Estimated Monthly Savings</p>
                    <p className="text-2xl font-bold text-gold-700">¥2,800</p>
                  </div>
                </>
              )}

              <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Estimates only. Actual amounts may vary based on your specific circumstances.</span>
              </div>
            </div>
          )}

          {/* 导航按钮 */}
          <div className="mt-6 flex justify-between">
            {step > 0 && step < 3 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm font-semibold text-navy-500 hover:text-navy-700">
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
            ) : <div />}
            {step < 2 && (
              <button type="button" disabled={!canNext()} onClick={() => setStep(step + 1)} className="flex items-center gap-1 rounded-lg bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {step === 2 && (
              <button type="button" onClick={() => setStep(3)} className="rounded-lg bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-gold-400">
                See Results
              </button>
            )}
            {step === 3 && (
              <button type="button" onClick={() => setStep(0)} className="rounded-lg bg-navy-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600">
                Start Over
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
