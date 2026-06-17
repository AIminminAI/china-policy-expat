import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy-200 bg-white p-4 shadow-lg md:p-6">
      <div className="container mx-auto flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
          <p className="text-sm text-navy-600">
            We use essential cookies to ensure the proper functioning of our website. By continuing to use this site, you agree to our use of cookies.{' '}
            <Link to="/privacy" className="text-gold-600 hover:underline">Learn more</Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={decline}
            className="rounded-lg border border-navy-300 px-4 py-2 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-gold-400"
          >
            Accept
          </button>
        </div>
        <button
          onClick={decline}
          className="absolute right-3 top-3 text-navy-400 hover:text-navy-600 md:hidden"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
