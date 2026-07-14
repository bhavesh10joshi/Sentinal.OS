import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Play, Square, Terminal, RefreshCw, ChevronDown, Trash2 } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'

const PLAYBOOKS = [
  'Full Repository Scan',
  'Auth Module Deep Dive',
  'Dependency Vulnerability Audit',
  'License Compliance Check',
  'OWASP Top 10 Scan',
  'Custom Playbook...',
]

const SAMPLE_LOG = [
  '[00:00.00] Playground initialized — Sentinel.OS v4.2',
  '[00:00.12] Loading playbook: "Auth Module Deep Dive"',
  '[00:00.34] Agent fleet allocating: SecurityGuard, ASTParser',
  '[00:01.02] Scanning: /src/auth (23 files)',
  '[00:03.45] SecurityGuard: Found TOCTOU at JWTHandler.ts:142',
  '[00:04.11] ASTParser: SQL injection vector at UserController.ts:88',
  '[00:05.22] Generating remediation suggestions...',
  '[00:06.10] Created 2 draft PRs (#1204, #1205)',
  '[00:06.44] Playbook complete. 2 issues found, 2 PRs ready.',
]

// Sentinel.OS — Playground Workspace
export function Playground() {
  const [running, setRunning] = useState(false)
  const [playbook, setPlaybook] = useState('Auth Module Deep Dive')
  const [logLines, setLogLines] = useState<string[]>([])
  const [dropOpen, setDropOpen] = useState(false)
  const termRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  }, [])

  const runPlaybook = () => {
    setRunning(true)
    setLogLines([])
    let i = 0
    const timer = setInterval(() => {
      setLogLines((prev) => [...prev, SAMPLE_LOG[i]])
      i++
      if (i >= SAMPLE_LOG.length) {
        clearInterval(timer)
        setRunning(false)
      }
    }, 500)
  }

  const stopPlaybook = () => {
    setRunning(false)
    setLogLines((prev) => [...prev, '[INTERRUPTED] Playbook stopped by user.'])
  }

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight
    }
  }, [logLines])

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Playground Workspace</h1>
          <p className="text-sm text-on-surface-variant mt-1">Sandbox environment for custom agent pipelines and security policy testing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Config panel */}
          <div className="lg:col-span-1 space-y-4">
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Configuration</h3>}>

              {/* Playbook selector */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Playbook</label>
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-surface-container/60 rounded-xl text-sm font-medium text-on-surface"
                  >
                    {playbook}
                    <ChevronDown size={15} className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl overflow-hidden z-20 shadow-glass-lg">
                      {PLAYBOOKS.map((p) => (
                        <button
                          key={p}
                          onClick={() => { setPlaybook(p); setDropOpen(false) }}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-surface-container transition-colors text-on-surface"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Target path */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Target Path</label>
                <input
                  type="text"
                  defaultValue="/src/auth"
                  className="w-full px-4 py-3 bg-surface-container/60 rounded-xl text-sm font-mono text-on-surface outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Agent selection */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">Agents</label>
                <div className="space-y-2">
                  {['SecurityGuard', 'ASTParser', 'AutoMerge'].map((a) => (
                    <label key={a} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-primary" />
                      <span className="text-sm text-on-surface font-mono">{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Run / Stop buttons */}
              <div className="flex gap-2">
                <button
                  onClick={running ? stopPlaybook : runPlaybook}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    running
                      ? 'bg-error-container text-on-error-container hover:scale-105'
                      : 'bg-primary-container text-on-primary-container hover:scale-105'
                  } active:scale-95`}
                >
                  {running ? <><Square size={14} /> Stop</> : <><Play size={14} /> Run</>}
                </button>
                <button
                  onClick={() => setLogLines([])}
                  className="w-12 flex items-center justify-center glass-card rounded-xl hover:bg-white/80 transition-all"
                >
                  <Trash2 size={15} className="text-on-surface-variant" />
                </button>
              </div>
            </GlassCard>

            {/* Environment info */}
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Environment</h3>}>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'Runtime',   val: 'Node 22 / WASM' },
                  { key: 'Model',     val: 'Gemini 1.5 Pro' },
                  { key: 'Mode',      val: 'Sandbox (no PRs)' },
                  { key: 'Timeout',   val: '120s' },
                ].map((e) => (
                  <div key={e.key} className="flex justify-between py-1.5 border-b border-outline-variant/20 last:border-0">
                    <span className="text-on-surface-variant">{e.key}</span>
                    <span className="font-mono font-semibold text-on-surface">{e.val}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Terminal output */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl overflow-hidden h-full flex flex-col" style={{ minHeight: '600px' }}>
              {/* Terminal chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-surface-container-highest/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error/50" />
                  <div className="w-3 h-3 rounded-full bg-warning-container" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-on-surface-variant" />
                  <span className="text-xs font-mono text-on-surface-variant">sentinel-playground</span>
                </div>
                {running && <RefreshCw size={13} className="text-primary animate-spin" />}
              </div>

              {/* Log output */}
              <div ref={termRef} className="flex-1 p-5 font-mono text-[12.5px] leading-relaxed space-y-1.5 overflow-y-auto bg-surface-container-lowest/30">
                {logLines.length === 0 && !running && (
                  <div className="text-on-surface-variant opacity-50 italic">
                    Configure playbook and click Run to start...
                  </div>
                )}
                {logLines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.includes('Found') || line.includes('INTERRUPTED') ? 'text-error' :
                      line.includes('complete') || line.includes('ready') ? 'text-success' :
                      line.includes('Scanning') || line.includes('Loading') ? 'text-primary' :
                      'text-on-surface-variant'
                    }
                  >
                    {line}
                  </div>
                ))}
                {running && (
                  <div className="flex items-center gap-1 text-primary">
                    <span>●</span>
                    <span className="animate-pulse">Running...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
