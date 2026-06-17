import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Star, ChevronDown, ChevronUp } from 'lucide-react'

const freeFeatures = [
  { text: 'Browse 3 policies per month', included: true },
  { text: 'Basic calculator', included: true },
  { text: 'Newsletter', included: true },
  { text: 'Unlimited policy access', included: false },
  { text: 'Full calculator results', included: false },
  { text: 'Application guides', included: false },
  { text: 'Priority support', included: false },
  { text: 'Policy change alerts', included: false },
]

const proFeatures = [
  { text: 'Browse 3 policies per month', included: true },
  { text: 'Basic calculator', included: true },
  { text: 'Newsletter', included: true },
  { text: 'Unlimited policy access', included: true },
  { text: 'Full calculator results', included: true },
  { text: 'Application guides', included: true },
  { text: 'Priority support', included: true },
  { text: 'Policy change alerts', included: true },
]

const faqs = [
  { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your Pro subscription at any time. You will retain access until the end of your billing period.' },
  { q: 'Is there a free trial for Pro?', a: 'We offer a 7-day free trial for new Pro subscribers. No credit card required to start.' },
  { q: 'What payment methods do you accept?', a: 'We accept major credit cards and debit cards through our secure payment processor, Creem.' },
  { q: 'How often is policy data updated?', a: 'Our team reviews and updates policy information weekly, ensuring you always have the latest data.' },
  { q: 'Can I get a refund?', a: 'If you are not satisfied, contact us within 14 days of purchase for a full refund.' },
]

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-navy-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-navy-700 text-center">Simple, Transparent Pricing</h1>
        <p className="mt-2 text-center text-navy-500">Choose the plan that fits your needs</p>

        {/* 价格卡片 */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-navy-700">Free</h2>
            <p className="mt-1 text-navy-500">Get started at no cost</p>
            <p className="mt-4 text-4xl font-bold text-navy-700">$0<span className="text-base font-normal text-navy-400">/mo</span></p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f.text} className="flex items-center gap-2 text-sm">
                  {f.included ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-navy-300" />}
                  <span className={f.included ? 'text-navy-600' : 'text-navy-400'}>{f.text}</span>
                </li>
              ))}
            </ul>
            <Link to="/policies" className="mt-8 block rounded-lg border-2 border-navy-700 py-2.5 text-center font-semibold text-navy-700 transition-colors hover:bg-navy-700 hover:text-white">
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-lg border-2 border-gold-500 bg-white p-8 shadow-md">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-0.5 text-xs font-bold text-navy-800 flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> Most Popular
            </span>
            <h2 className="font-heading text-2xl font-bold text-navy-700">Pro</h2>
            <p className="mt-1 text-navy-500">Full access to everything</p>
            <div className="mt-4">
              <p className="text-4xl font-bold text-navy-700">$9.9<span className="text-base font-normal text-navy-400">/mo</span></p>
              <p className="text-sm text-gold-600 font-semibold">or $49/year (save 59%)</p>
            </div>
            <ul className="mt-6 space-y-3">
              {proFeatures.map((f) => (
                <li key={f.text} className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-navy-600">{f.text}</span>
                </li>
              ))}
            </ul>
            <Link to="/calculator" className="mt-8 block rounded-lg bg-gold-500 py-2.5 text-center font-semibold text-navy-800 transition-colors hover:bg-gold-400">
              Upgrade to Pro
            </Link>
          </div>
        </div>

        {/* Refund guarantee */}
        <p className="mt-6 text-center text-sm text-navy-500">
          14-day money-back guarantee. Not satisfied? Contact us for a full refund — no questions asked.{' '}
          <Link to="/terms" className="text-gold-600 hover:underline">See terms</Link>
        </p>

        {/* FAQ */}
        <section className="mx-auto mt-16 max-w-2xl">
          <h2 className="font-heading text-2xl font-bold text-navy-700 text-center">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg bg-white shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-navy-700"
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="h-5 w-5 text-navy-400" /> : <ChevronDown className="h-5 w-5 text-navy-400" />}
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-4 text-sm text-navy-500">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
