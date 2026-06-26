import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield, Coffee } from 'lucide-react'

const navLinks = [
  { to: '/policies', label: 'Policies' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/support', label: 'Support' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="bg-navy-700 text-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold font-heading">
          <Shield className="h-7 w-7 text-gold-500" />
          <span>ChinaPolicyGuide</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-gold-400 ${
                pathname.startsWith(link.to) ? 'text-gold-400' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/support"
            className="flex items-center gap-1 rounded bg-gold-500 px-4 py-1.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-gold-400"
          >
            <Coffee className="h-4 w-4" /> Buy Us a Coffee
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-navy-600 bg-navy-800 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-semibold transition-colors hover:text-gold-400 ${
                pathname.startsWith(link.to) ? 'text-gold-400' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/support"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center gap-1 rounded bg-gold-500 px-4 py-1.5 text-sm font-semibold text-navy-800"
          >
            <Coffee className="h-4 w-4" /> Buy Us a Coffee
          </Link>
        </nav>
      )}
    </header>
  )
}
