import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import Home from './pages/Home'
import Policies from './pages/Policies'
import PolicyDetail from './pages/PolicyDetail'
import Calculator from './pages/Calculator'
import Pricing from './pages/Pricing'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'
import Success from './pages/Success'

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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
