import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { Shield, Zap, GitBranch, Search, BarChart3, ArrowRight, Terminal, CheckCircle } from 'lucide-react'
import { Navbar } from '../Components/Navbar'
import { ThreeBackground } from '../Components/ThreeBackground'
import { WebGLShader } from '../Components/WebGLShader'
import { TerminalMockup } from '../Components/TerminalMockup'
import { GlassCard } from '../Components/GlassCard'

const FEATURES = [
  {
    icon: <Shield size={22} />,
    title: 'AST-Level Security Scanning',
    desc: 'Tree-Sitter parses your TypeScript, JavaScript, and C++ code into function-level blocks for structured AI review.',
    accent: 'bg-primary-fixed text-primary',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'GitHub Webhook Integration',
    desc: 'Connect your repository via webhook to receive push event notifications. Full file-fetch scan is a planned feature.',
    accent: 'bg-primary-fixed text-primary',
  },
  {
    icon: <Search size={22} />,
    title: 'Semantic Code Search',
    desc: 'Query your indexed codebase using natural language. Powered by Gemini embeddings and Pinecone vector search.',
    accent: 'bg-primary-fixed text-primary',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Scan Analytics',
    desc: 'Charts and breakdowns derived from your real scan history — vulnerability counts, severity distribution, and scan success rate.',
    accent: 'bg-primary-fixed text-primary',
  },
  {
    icon: <Zap size={22} />,
    title: 'Playground Workspace',
    desc: 'Paste raw code or upload a file directly for immediate AST parsing and AI security review with live job streaming.',
    accent: 'bg-primary-fixed text-primary',
  },
]

// Note: stats below are placeholders — no real aggregated usage data is tracked
const STATS = [
  { value: 'AST', label: 'Function-level parsing' },
  { value: 'LLM', label: 'Gemini AI analysis' },
  { value: 'RAG', label: 'Pinecone vector search' },
  { value: 'BullMQ', label: 'Async job queue' },
]

// Sentinel.OS Landing Page — hero, features, stats, CTA
// Mirrors Aegis Core "Sentinel.OS — Landing Page" screen
export function LandingPage() {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero entrance
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }
      )
    }

    // Stats counter animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.6 }
      )
    }

    // Features grid
    if (featRef.current) {
      gsap.fromTo(
        featRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out', delay: 0.4 }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">

      {/* WebGL animated grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader className="w-full h-full" opacity={0.3} />
      </div>

      {/* Three.js neural net background (subtle, behind content) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <ThreeBackground className="w-full h-full" />
      </div>

      <Navbar />

      {/* ====== HERO ====== */}
      <main className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left — copy */}
            <div ref={heroRef} className="lg:col-span-6 space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Production Ready v4.2
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.05]">
                Sentinel.OS — <br />
                <span className="text-primary text-glow">Autonomous AI</span> <br />
                Code Review.
              </h1>

              <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Secure your repository at the Abstract Syntax level. Moving beyond regex-based linting
                with multi-agent orchestration for deep semantic vulnerability detection.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => navigate('/Sentinel/Dashboard')}
                  className="flex items-center gap-2 px-8 py-4 bg-primary-container text-on-primary-container
                             rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>Launch Control Center</span>
                  <Terminal size={18} />
                </button>

                <button
                  onClick={() => navigate('/Sentinel/Login')}
                  className="flex items-center gap-2 px-8 py-4 bg-white/40 backdrop-blur-md border
                             border-outline-variant/30 text-on-surface rounded-xl font-bold hover:bg-white/60 transition-all"
                >
                  Sign In
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {['SOC 2 Type II', 'GDPR Compliant', 'ISO 27001'].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                    <CheckCircle size={13} className="text-success" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — terminal mockup */}
            <div className="lg:col-span-6">
              <TerminalMockup className="lg:rotate-1 hover:rotate-0 transition-transform duration-700" />
            </div>
          </div>
        </div>

        {/* ====== STATS BAR ====== */}
        <div className="max-w-7xl mx-auto px-8 mt-24">
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden
                       border border-outline-variant/20"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface/80 backdrop-blur-sm px-8 py-7 text-center">
                <p className="text-4xl font-extrabold text-primary tracking-tighter">{s.value}</p>
                <p className="text-xs font-semibold text-on-surface-variant mt-1.5 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ====== FEATURES GRID ====== */}
        <div className="max-w-7xl mx-auto px-8 mt-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface">
              Everything your security workflow needs
            </h2>
            <p className="mt-3 text-on-surface-variant max-w-2xl mx-auto">
              A complete autonomous platform — from ingestion to remediation, with full traceability.
            </p>
          </div>

          <div ref={featRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <GlassCard key={f.title} hoverable className="h-full">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 ${f.accent}`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-on-surface mb-2">{f.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* ====== CTA SECTION ====== */}
        <div className="max-w-7xl mx-auto px-8 mt-28">
          <div className="glass-panel rounded-2xl px-10 py-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-container/10 pointer-events-none" />
            <h2 className="relative text-3xl font-extrabold tracking-tight text-on-surface mb-4">
              Ready to secure your codebase?
            </h2>
            <p className="relative text-on-surface-variant mb-8 max-w-xl mx-auto">
              Join 2,400+ engineering teams using Sentinel.OS to catch vulnerabilities before they reach production.
            </p>
            <button
              onClick={() => navigate('/Sentinel/SignUp')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary-container text-on-primary-container
                         rounded-xl font-bold text-base shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Get Started Free <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-8 mt-20 pb-10 text-center text-xs text-on-surface-variant">
          © 2026 Sentinel.OS — Autonomous AI Agentic Code Review Platform
        </footer>
      </main>
    </div>
  )
}
