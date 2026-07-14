import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Shield, ArrowRight } from 'lucide-react'
import { SentinelIcon } from '../Ui/Icons/SentinelIcon'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'

// Sentinel.OS — About / Why We Built This
// Since the backend has no separate sign-up (userId-based identity),
// this page explains the platform and redirects returning users to login setup.
export function SignUp() {
  const navigate = useNavigate()
  const isIdentified = useAuthStore((s) => s.isIdentified)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isIdentified) navigate('/Sentinel/Dashboard')
  }, [isIdentified, navigate])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' })
    }
  }, [])

  const WHY_POINTS = [
    {
      title: 'The Problem We Faced',
      desc: 'Traditional code review cycles were too slow — security audits ran weekly, PRs sat for days, and critical vulnerabilities slipped to production undetected.',
    },
    {
      title: 'Our Solution',
      desc: 'Sentinel.OS orchestrates autonomous AI agents (powered by Gemini 1.5 Pro) that review every commit at the Abstract Syntax Tree level — in seconds, not days.',
    },
    {
      title: 'No Account Needed',
      desc: 'Sentinel.OS uses a workspace ID instead of traditional accounts. Your scans, history, and semantic embeddings are all namespaced to your workspace ID.',
    },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 py-12">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.25} className="w-full h-full" />
      </div>

      <div ref={cardRef} className="relative z-10 w-full max-w-lg">

        <div className="flex flex-col items-center mb-8">
          <SentinelIcon size={48} />
          <h1 className="text-2xl font-extrabold tracking-tight text-on-surface mt-4">
            Why Sentinel.OS?
          </h1>
          <p className="text-sm text-on-surface-variant mt-2 text-center">
            Built out of frustration with slow, manual security reviews.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {WHY_POINTS.map((p, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-fixed text-primary text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface mb-1">{p.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/Sentinel/Login')}
          className="w-full flex items-center justify-center gap-2 py-4 bg-primary-container
                     text-on-primary-container font-bold rounded-xl hover:scale-[1.02] active:scale-95
                     transition-all shadow-md text-sm"
        >
          <Shield size={16} />
          Set Up My Workspace
          <ArrowRight size={15} />
        </button>

        <p className="text-center mt-6 text-xs text-on-surface-variant">
          <button onClick={() => navigate('/LandingPage')} className="hover:text-primary transition-colors">
            Back to Landing Page
          </button>
        </p>
      </div>
    </div>
  )
}
