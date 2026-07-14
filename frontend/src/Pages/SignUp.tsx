import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Eye, EyeOff, Shield } from 'lucide-react'
import { SentinelIcon } from '../Ui/Icons/SentinelIcon'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { signUpSchema } from '../Validations/schemas'
import axios from 'axios'
import BACKEND_URL from '../BackendUrl'

// Sentinel.OS — Sign Up Page
export function SignUp() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = signUpSchema.safeParse({ name, email, password, confirmPassword })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }

    setLoading(true)
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/auth/signup`, { name, email, password })
      setAuth(data.user, data.token)
      navigate('/Sentinel/Dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 bg-surface-container/60 rounded-xl text-sm text-on-surface placeholder-on-surface-variant/40 outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/20 transition-all'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 py-12">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.25} className="w-full h-full" />
      </div>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={cardRef} className="relative z-10 w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <SentinelIcon size={48} />
          <h1 className="text-2xl font-extrabold tracking-tight text-on-surface mt-4">Create your account</h1>
          <p className="text-sm text-on-surface-variant mt-1">Join Sentinel.OS — free forever for open source</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 shadow-glass-lg">

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-error-container/60 border border-error/10">
              <p className="text-sm text-error font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Josh Bartholomew" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="agent@sentinel.os" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-container text-on-primary-container
                         font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-md mt-2
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin border-2 border-on-primary-container/30 border-t-on-primary-container w-4 h-4 rounded-full" />
              ) : (
                <>
                  <Shield size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-on-surface-variant">
            Already have an account?{' '}
            <button onClick={() => navigate('/Sentinel/Login')} className="text-primary font-semibold hover:underline">
              Sign in
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
