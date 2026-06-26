import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import Policies from './pages/Policies'
import PolicyDetail from './pages/PolicyDetail'
import Calculator from './pages/Calculator'
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'

function NotFound() {
  return (
    <div className="bg-navy-50 min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h1 className="font-heading text-6xl font-bold text-navy-700">404</h1>
        <p className="mt-4 text-xl text-navy-500">Page not found</p>
        <p className="mt-2 text-navy-400">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-gold-500 px-6 py-3 font-semibold text-navy-800 transition-colors hover:bg-gold-400"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col font-body text-navy-700">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/policies/:id" element={<PolicyDetail />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Support />} />
          <Route path="/success" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
