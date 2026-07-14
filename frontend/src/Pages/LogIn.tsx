import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Terminal, User, ChevronRight } from 'lucide-react'
import { SentinelIcon } from '../Ui/Icons/SentinelIcon'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'

// Sentinel.OS — Workspace Identity Setup
// The backend uses plain userId strings — no JWT auth required.
// Users enter a display name and workspace ID once; it is stored in localStorage.
export function LogIn() {
  const navigate = useNavigate()
  const setIdentity = useAuthStore((s) => s.setIdentity)
  const isIdentified = useAuthStore((s) => s.isIdentified)

  const [displayName, setDisplayName] = useState('')
  const [workspaceId, setWorkspaceId] = useState('')
  const [error, setError] = useState('')

  const cardRef = useRef<HTMLDivElement>(null)

  // Already identified — go straight to dashboard
  useEffect(() => {
    if (isIdentified) {
      navigate('/Sentinel/Dashboard')
    }
  }, [isIdentified, navigate])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedName = displayName.trim()
    const trimmedId = workspaceId.trim().replace(/\s+/g, '_').toLowerCase()

    if (!trimmedName) {
      setError('Please enter your display name.')
      return
    }
    if (!trimmedId) {
      setError('Please enter a workspace ID.')
      return
    }
    if (trimmedId.length < 3) {
      setError('Workspace ID must be at least 3 characters.')
      return
    }

    // Persist userId and displayName to localStorage via Zustand store
    setIdentity(trimmedId, trimmedName)
    navigate('/Sentinel/Dashboard')
  }

  const handleQuickAccess = () => {
    // Quick anonymous access — generates a timestamped guest ID
    const guestId = `guest_${Date.now()}`
    setIdentity(guestId, 'Guest Operator')
    navigate('/Sentinel/Dashboard')
  }

  const inputClass =
    'w-full px-4 py-3 bg-surface-container/60 rounded-xl text-sm text-on-surface ' +
    'placeholder-on-surface-variant/40 outline-none focus:ring-2 focus:ring-primary/30 ' +
    'border border-transparent focus:border-primary/20 transition-all'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.25} className="w-full h-full" />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={cardRef} className="relative z-10 w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <SentinelIcon size={48} />
          <h1 className="text-2xl font-extrabold tracking-tight text-on-surface mt-4">
            Set Your Workspace Identity
          </h1>
          <p className="text-sm text-on-surface-variant mt-2 text-center max-w-sm">
            Sentinel.OS uses a <span className="text-primary font-semibold">workspace ID</span> to
            track your scans, history, and vector embeddings — no account needed.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-8 shadow-glass-lg">

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-error-container/60 border border-error/10">
              <p className="text-sm text-error font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                Display Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Josh Bartholomew"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                Workspace ID
              </label>
              <div className="relative">
                <Terminal size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  value={workspaceId}
                  onChange={(e) => setWorkspaceId(e.target.value)}
                  placeholder="e.g. joshb or my-project"
                  className={`${inputClass} pl-10`}
                />
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1.5 ml-1">
                Used as your unique scan namespace in the database and vector store.
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-container
                         text-on-primary-container font-bold rounded-xl hover:scale-[1.02] active:scale-95
                         transition-all shadow-md mt-2"
            >
              <Terminal size={16} />
              Launch Terminal
              <ChevronRight size={15} />
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-outline-variant/30 text-center">
            <button
              onClick={handleQuickAccess}
              className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium"
            >
              Continue as Guest (anonymous scan)
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-on-surface-variant">
          <button onClick={() => navigate('/LandingPage')} className="hover:text-primary transition-colors">
            Back to Sentinel.OS
          </button>
        </p>
      </div>
    </div>
  )
}
