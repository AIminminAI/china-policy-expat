import { useState } from 'react'
import { ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react'
import { calculateMatchedPolicies } from '../lib/calculator'
import type { MatchedPolicy } from '../lib/types'

const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou', 'Chengdu', 'Nanjing', 'Wuhan', 'Suzhou', 'Xiamen']
const visaTypes = ['Work (Z)', 'Student (X)', 'Talent (R)', 'Permanent (D)', 'Business (M)']

const priorityStyle = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-green-100 text-green-700',
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

  const [results, setResults] = useState<MatchedPolicy[] | null>(null)
  const [summary, setSummary] = useState('')

  const canNext = () => {
    if (step === 0) return city !== '' && visa !== ''
    return true
  }

  const handleSubmit = () => {
    const data = calculateMatchedPolicies({
      city,
      visaType: visa,
      monthlyIncome: income,
      hasChildren,
      childrenAge: childAges
        ? childAges.split(',').map((a) => parseInt(a.trim(), 10)).filter((n) => !isNaN(n))
        : [],
      hasElderly,
      rentOrBuy: housing.toLowerCase() as 'rent' | 'buy',
    })
    setResults(data.matchedPolicies)
    setSummary(data.summary)
    setStep(3)
  }

  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700 text-center">Subsidy Calculator</h1>
        <p className="mt-2 text-center text-navy-500">Find out which benefits you may be eligible for — 100% free</p>

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

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          {/* Step 1 */}
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

          {/* Step 2 */}
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

          {/* Step 3 */}
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

          {/* 结果页 - 全部免费，本地计算 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-heading text-xl font-bold text-navy-700">Your Estimated Benefits</h2>

              {results && results.length > 0 ? (
                <>
                  {results.map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-navy-50 p-4">
                      <div>
                        <p className="font-semibold text-navy-700">{r.policy.titleEn}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${priorityStyle[r.priority]}`}>
                          {r.priority.charAt(0).toUpperCase() + r.priority.slice(1)} Priority
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gold-600">{r.estimatedAmount}</p>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-navy-500">No matching policies found for your profile. Try adjusting your inputs.</p>
              )}

              {summary && (
                <p className="text-sm text-navy-600">{summary}</p>
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
              <button type="button" onClick={handleSubmit} className="rounded-lg bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-gold-400">
                See Results
              </button>
            )}
            {step === 3 && (
              <button type="button" onClick={() => { setStep(0); setResults(null); }} className="rounded-lg bg-navy-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600">
                Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
