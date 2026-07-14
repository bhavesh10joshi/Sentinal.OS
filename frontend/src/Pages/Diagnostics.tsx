import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { AlertTriangle, Shield, CheckCircle, Code, ChevronDown, ChevronUp } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { useState } from 'react'

interface DiagResult {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  file: string
  line: number
  agent: string
  desc: string
  fix: string
}

const RESULTS: DiagResult[] = [
  {
    id: 'VUL-001',
    severity: 'critical',
    title: 'TOCTOU Race Condition',
    file: '/src/auth/JWTHandler.ts',
    line: 142,
    agent: 'SecurityGuard',
    desc: 'Time-of-Check Time-of-Use vulnerability in verifySession() — attacker can exploit the gap between check and use.',
    fix: '- const session = await getCache(id);\n+ const session = await atomicSessionLookup(id);',
  },
  {
    id: 'VUL-002',
    severity: 'high',
    title: 'SQL Injection Vector',
    file: '/src/api/UserController.ts',
    line: 88,
    agent: 'SecurityGuard',
    desc: 'Raw string interpolation in query builder without parameterization detected in getUser().',
    fix: '- db.query(`SELECT * FROM users WHERE id=${id}`);\n+ db.query("SELECT * FROM users WHERE id=?", [id]);',
  },
  {
    id: 'VUL-003',
    severity: 'medium',
    title: 'Missing Rate Limit',
    file: '/src/routes/auth.ts',
    line: 23,
    agent: 'ASTParser',
    desc: 'Login endpoint lacks rate limiting — vulnerable to credential stuffing attacks.',
    fix: '+ app.use("/auth/login", rateLimiter({ max: 5, windowMs: 60000 }));',
  },
  {
    id: 'VUL-004',
    severity: 'low',
    title: 'Deprecated Crypto API',
    file: '/src/utils/CryptoHelper.ts',
    line: 17,
    agent: 'ASTParser',
    desc: 'MD5 hashing used for non-critical checksum. Recommend upgrading to SHA-256.',
    fix: '- crypto.createHash("md5")\n+ crypto.createHash("sha256")',
  },
]

const severityConfig = {
  critical: { bg: 'bg-error-container', text: 'text-error', border: 'border-error/20', icon: <AlertTriangle size={14} /> },
  high:     { bg: 'bg-warning-container', text: 'text-warning', border: 'border-warning/20', icon: <AlertTriangle size={14} /> },
  medium:   { bg: 'bg-primary-fixed', text: 'text-primary', border: 'border-primary/20', icon: <Shield size={14} /> },
  low:      { bg: 'bg-surface-container', text: 'text-outline', border: 'border-outline-variant/30', icon: <CheckCircle size={14} /> },
}

// Sentinel.OS — Diagnostic Results View
export function Diagnostics() {
  const [expanded, setExpanded] = useState<string | null>('VUL-001')
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    if (listRef.current) {
      gsap.fromTo(listRef.current.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.2 })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Diagnostic Results</h1>
            <p className="text-sm text-on-surface-variant mt-1">4 issues found across 47 files scanned</p>
          </div>
          <div className="flex gap-3">
            <button className="glass-card px-4 py-2 text-sm font-semibold rounded-xl hover:bg-white/80 transition-all text-on-surface">
              Export PDF
            </button>
            <button className="px-4 py-2 bg-primary-container text-on-primary-container text-sm font-semibold
                               rounded-xl hover:scale-105 active:scale-95 transition-all">
              Create PRs for All
            </button>
          </div>
        </div>

        {/* Summary bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {(['critical', 'high', 'medium', 'low'] as const).map((sev) => {
            const cfg = severityConfig[sev]
            const count = RESULTS.filter((r) => r.severity === sev).length
            return (
              <div key={sev} className={`glass-card rounded-xl p-4 border ${cfg.border}`}>
                <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2 ${cfg.text}`}>
                  {cfg.icon} {sev}
                </div>
                <p className="text-3xl font-extrabold text-on-surface">{count}</p>
              </div>
            )
          })}
        </div>

        {/* Results list */}
        <div ref={listRef} className="space-y-3">
          {RESULTS.map((result) => {
            const cfg = severityConfig[result.severity]
            const open = expanded === result.id

            return (
              <div key={result.id} className={`glass-card rounded-xl overflow-hidden border ${cfg.border}`}>
                {/* Result header */}
                <button
                  onClick={() => setExpanded(open ? null : result.id)}
                  className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/60 transition-colors"
                >
                  <span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
                    {cfg.icon} {result.severity}
                  </span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-on-surface">{result.title}</p>
                    <p className="text-xs font-mono text-on-surface-variant mt-0.5">{result.file}:{result.line}</p>
                  </div>
                  <span className="text-xs text-on-surface-variant">{result.agent}</span>
                  <span className="text-xs font-mono bg-surface-container px-2 py-1 rounded text-on-surface-variant">{result.id}</span>
                  {open ? <ChevronUp size={16} className="text-on-surface-variant" /> : <ChevronDown size={16} className="text-on-surface-variant" />}
                </button>

                {/* Expanded body */}
                {open && (
                  <div className="px-5 pb-5 border-t border-black/5">
                    <p className="text-sm text-on-surface-variant mt-4 mb-4">{result.desc}</p>

                    <div className="rounded-xl overflow-hidden border border-on-surface/10">
                      <div className="flex items-center gap-2 px-4 py-2 bg-on-surface/5 border-b border-on-surface/5">
                        <Code size={14} className="text-on-surface-variant" />
                        <span className="text-xs font-semibold text-on-surface-variant">Remediation Suggestion</span>
                      </div>
                      <pre className="p-4 text-[12px] font-mono bg-on-surface text-surface leading-relaxed overflow-x-auto">
                        {result.fix.split('\n').map((line, i) => (
                          <div key={i} className={line.startsWith('+') ? 'text-success' : line.startsWith('-') ? 'text-error' : 'text-on-surface-variant'}>
                            {line}
                          </div>
                        ))}
                      </pre>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-primary-container text-on-primary-container text-xs font-semibold rounded-lg hover:scale-105 transition-all">
                        Create Auto-PR
                      </button>
                      <button className="px-4 py-2 glass-card text-on-surface text-xs font-semibold rounded-lg hover:bg-white/80 transition-all">
                        Mark as Accepted Risk
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
