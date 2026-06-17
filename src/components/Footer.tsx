import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

const footerLinks = [
  { to: '/policies', label: 'Policies' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-200">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold font-heading text-white">
              <Shield className="h-6 w-6 text-gold-500" />
              ChinaPolicyGuide
            </Link>
            <p className="mt-2 text-sm text-navy-300">
              Made for expats living in China
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-navy-300 transition-colors hover:text-gold-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-navy-700 pt-6 text-center text-xs text-navy-400">
          © {new Date().getFullYear()} ChinaPolicyGuide. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
