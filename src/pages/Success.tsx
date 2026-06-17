import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function Success() {
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan_id') || ''

  useEffect(() => {
    localStorage.setItem('subscription_status', 'active')
    if (planId) {
      localStorage.setItem('subscription_plan', planId)
    }
  }, [planId])

  return (
    <div className="bg-navy-50 min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="rounded-lg bg-white p-10 shadow-md">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 font-heading text-3xl font-bold text-navy-700">Welcome to Pro!</h1>
          <p className="mt-3 text-navy-500">
            Your subscription is now active. You have full access to all Pro features.
          </p>
          <div className="mt-8 space-y-3">
            <Link
              to="/policies"
              className="flex items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
            >
              Browse Policies <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/calculator"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-navy-700 py-3 font-semibold text-navy-700 transition-colors hover:bg-navy-700 hover:text-white"
            >
              Try the Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
