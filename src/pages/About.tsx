import { Heart, BookOpen, AlertTriangle, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="bg-navy-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-navy-700">About ChinaPolicyGuide</h1>

        <div className="mt-8 space-y-10 text-navy-600 leading-relaxed">
          {/* 使命 */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-gold-500" />
              <h2 className="font-heading text-xl font-bold text-navy-700">Our Mission</h2>
            </div>
            <p className="mt-3">Helping expats navigate China's policy landscape. We believe every foreigner in China deserves clear, accessible information about the benefits and obligations that apply to them.</p>
          </section>

          {/* 为什么做这个 */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-gold-500" />
              <h2 className="font-heading text-xl font-bold text-navy-700">Why We Built This</h2>
            </div>
            <p className="mt-3">When we arrived in China, we found that policy information for foreigners was scattered across government websites — mostly in Chinese, often outdated, and rarely in one place. We built ChinaPolicyGuide to be the resource we wished we had: a single, English-language source of truth for the policies that affect expats most.</p>
          </section>

          {/* 数据来源 */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-gold-500" />
              <h2 className="font-heading text-xl font-bold text-navy-700">Data Sources</h2>
            </div>
            <p className="mt-3">Our policy data is sourced from:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Official Chinese government websites and publications</li>
              <li>Municipal Human Resources and Social Security bureaus</li>
              <li>Tax administration bulletins and circulars</li>
              <li>Verified translations of policy documents</li>
              <li>Consultations with licensed legal professionals</li>
            </ul>
          </section>

          {/* 免责声明 */}
          <section className="rounded-lg border-2 border-amber-300 bg-amber-50 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <h2 className="font-heading text-xl font-bold text-navy-700">Disclaimer</h2>
            </div>
            <p className="mt-3">ChinaPolicyGuide provides general information about Chinese policies for informational purposes only. This is <strong>not legal advice</strong>. Policy details change frequently and vary by city and individual circumstances. Always consult a qualified legal professional or the relevant government bureau for advice specific to your situation. We make no warranties about the accuracy or completeness of the information provided.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
