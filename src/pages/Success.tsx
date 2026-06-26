import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, ArrowRight, Loader2, AlertCircle, XCircle } from 'lucide-react'

export default function Success() {
  const [searchParams] = useSearchParams()
  const planId = searchParams.get('plan_id') || ''
  const sessionId = searchParams.get('session_id') || ''
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function verifyCheckout() {
      // 必须有 session_id 才能验证
      if (!sessionId) {
        setVerifying(false)
        setError('Missing payment session information. If you just completed a payment, please wait a moment and refresh.')
        return
      }

      try {
        const response = await fetch(
          `/api/checkout?session_id=${encodeURIComponent(sessionId)}`
        )
        if (response.ok) {
          const data = await response.json()
          if (data.status === 'completed' || data.status === 'paid') {
            // 验证成功后才设置 localStorage
            localStorage.setItem('subscription_status', 'active')
            if (planId) {
              localStorage.setItem('subscription_plan', planId)
            }
            setVerified(true)
          } else {
            setError('Payment is being processed. Your access will be activated shortly.')
          }
        } else {
          setError('Unable to verify payment. Please contact support if you were charged.')
        }
      } catch {
        setError('Network error during verification. Please refresh the page.')
      } finally {
        setVerifying(false)
      }
    }

    verifyCheckout()
  }, [planId, sessionId])

  return (
    <div className="bg-navy-50 min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <div className="rounded-lg bg-white p-10 shadow-md">
          {verifying ? (
            <>
              <Loader2 className="mx-auto h-16 w-16 text-gold-500 animate-spin" />
              <h1 className="mt-4 font-heading text-2xl font-bold text-navy-700">Verifying your payment...</h1>
              <p className="mt-2 text-navy-500">Please wait while we confirm your subscription.</p>
            </>
          ) : verified ? (
            <>
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
            </>
          ) : (
            <>
              {error.includes('processing') ? (
                <AlertCircle className="mx-auto h-16 w-16 text-amber-500" />
              ) : (
                <XCircle className="mx-auto h-16 w-16 text-red-500" />
              )}
              <h1 className="mt-4 font-heading text-2xl font-bold text-navy-700">
                {error.includes('processing') ? 'Payment Processing' : 'Verification Needed'}
              </h1>
              <p className="mt-3 text-navy-500">{error}</p>
              <div className="mt-8 space-y-3">
                <Link
                  to="/pricing"
                  className="flex items-center justify-center gap-2 rounded-lg bg-gold-500 py-3 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
                >
                  Back to Pricing <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-navy-700 py-3 font-semibold text-navy-700 transition-colors hover:bg-navy-700 hover:text-white"
                >
                  Go Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
