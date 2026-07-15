import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Terminal,
  GitBranch,
  Search,
  FlaskConical,
  BarChart3,
  Inbox,
  LogOut,
  User,
} from 'lucide-react'
import { SentinelIcon } from '../Ui/Icons/SentinelIcon'
import { useAuthStore } from '../Store/useAuthStore'
import { ThemeToggle } from './ThemeToggle'

interface NavItem {
  icon: React.ReactNode
  label: string
  route: string
}

// Vertical floating glass sidebar dock — pill-shaped, fixed left
export function FloatingDock() {
  const navigate = useNavigate()
  const location = useLocation()
  const clearIdentity = useAuthStore((s) => s.clearIdentity)
  const userId = useAuthStore((s) => s.userId)
  const displayName = useAuthStore((s) => s.displayName)

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', route: '/Sentinel/Dashboard' },
    { icon: <Inbox size={20} />,           label: 'Ingestion',  route: '/Sentinel/Ingestion' },
    { icon: <Terminal size={20} />,        label: 'Diagnostics',route: '/Sentinel/Diagnostics' },
    { icon: <GitBranch size={20} />,       label: 'GitHub',     route: '/Sentinel/GitHub' },
    { icon: <Search size={20} />,          label: 'Search',     route: '/Sentinel/Search' },
    { icon: <FlaskConical size={20} />,    label: 'Playground', route: '/Sentinel/Playground' },
    { icon: <BarChart3 size={20} />,       label: 'Analytics',  route: '/Sentinel/Analytics' },
  ]

  const handleLogout = () => {
    clearIdentity()
    navigate('/Sentinel/Login')
  }

  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 py-5 px-3 glass-dock rounded-full">

      {/* Logo mark at top */}
      <button
        onClick={() => navigate('/Sentinel/Dashboard')}
        className="mb-1 p-1 rounded-full hover:scale-110 transition-transform"
        title="Home"
      >
        <SentinelIcon size={24} />
      </button>

      {/* User identity badge */}
      {userId && (
        <div
          title={`Workspace: ${userId}\nName: ${displayName ?? 'Guest'}`}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-fixed text-primary text-[10px] font-bold uppercase cursor-default"
        >
          {(displayName ?? userId).charAt(0).toUpperCase()}
        </div>
      )}

      {!userId && (
        <button
          onClick={() => navigate('/Sentinel/Login')}
          title="Set Workspace Identity"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
        >
          <User size={14} />
        </button>
      )}

      <div className="w-8 h-px bg-outline-variant/40 my-1" />

      {/* Nav icons */}
      {navItems.map((item) => {
        const active = location.pathname === item.route
        return (
          <button
            key={`${item.route}-${item.label}`}
            onClick={() => navigate(item.route)}
            title={item.label}
            className={`group relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
              active
                ? 'bg-primary-container text-on-primary-container shadow-glow-blue scale-110'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-primary hover:scale-110'
            }`}
          >
            {item.icon}

            {/* Tooltip */}
            <span className="absolute left-14 px-2 py-1 rounded-md bg-on-surface text-surface text-xs font-medium
                             whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                             shadow-glass-lg z-50">
              {item.label}
            </span>
          </button>
        )
      })}

      <div className="w-8 h-px bg-outline-variant/40 my-1" />

      <ThemeToggle />

      {/* Logout / clear identity */}
      <button
        onClick={handleLogout}
        title="Clear Identity"
        className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant
                   hover:bg-error-container/30 hover:text-error hover:scale-110 transition-all"
      >
        <LogOut size={18} />
      </button>
    </aside>
  )
}
