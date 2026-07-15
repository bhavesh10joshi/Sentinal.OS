import { useNavigate, useLocation } from 'react-router-dom'
import { SentinelIcon } from '../Ui/Icons/SentinelIcon'
import { ThemeToggle } from './ThemeToggle'

// Top glass navigation bar — fixed, full width
export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { label: 'Platform', href: '/LandingPage', match: '/LandingPage' },
    { label: 'Security', href: '/Sentinel/Diagnostics', match: '/Sentinel/Diagnostics' },
    { label: 'Docs', href: '/Sentinel/Playground', match: '/Sentinel/Playground' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-black/5">
      <div className="flex justify-between items-center h-16 px-8 max-w-full mx-auto">

        {/* Logo + Wordmark */}
        <button
          onClick={() => navigate('/LandingPage')}
          className="flex items-center gap-3 group"
        >
          <SentinelIcon size={28} />
          <span className="text-base font-bold tracking-tighter text-on-surface group-hover:text-primary transition-colors">
            Sentinel.OS
          </span>
        </button>

        {/* Nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = location.pathname.startsWith(link.match)
            return (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={`text-sm font-semibold tracking-tight transition-colors ${
                  active
                    ? 'text-primary border-b-2 border-primary pb-0.5'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => navigate('/Sentinel/Login')}
            className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/Sentinel/Dashboard')}
            className="px-5 py-2 bg-primary-container text-on-primary-container text-sm font-semibold rounded-lg
                       hover:scale-105 active:scale-95 transition-transform shadow-sm"
          >
            Launch Terminal
          </button>
        </div>
      </div>
    </nav>
  )
}
