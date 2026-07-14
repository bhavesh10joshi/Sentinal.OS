import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Shield, AlertTriangle, CheckCircle, Clock, Cpu, TrendingUp } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { AgentCard } from '../Components/AgentCard'
import { MetricCard } from '../Components/MetricCard'
import { ActivityFeed } from '../Components/ActivityFeed'
import { WebGLShader } from '../Components/WebGLShader'
import { ScanLine } from '../Components/ScanLine'

const AGENTS = [
  { name: 'SecurityGuard',  role: 'Vulnerability Detection', status: 'active' as const,  taskCount: 142, currentTask: 'Scanning JWTHandler.ts', successRate: 99, delay: 0.1 },
  { name: 'ASTParser',      role: 'Syntax Tree Analysis',    status: 'active' as const,  taskCount: 89,  currentTask: 'Parsing /src/api routes',  successRate: 100, delay: 0.2 },
  { name: 'AutoMerge',      role: 'PR Automation',           status: 'queued' as const,  taskCount: 34,  currentTask: 'Awaiting review on PR #1205', successRate: 97, delay: 0.3 },
  { name: 'DependBot',      role: 'Dependency Audit',        status: 'idle' as const,    taskCount: 21,  currentTask: undefined, successRate: 98, delay: 0.4 },
  { name: 'TestRunner',     role: 'Automated QA',            status: 'active' as const,  taskCount: 56,  currentTask: 'Running auth.spec.ts suite', successRate: 96, delay: 0.5 },
  { name: 'SemanticSearch', role: 'Code Intelligence',       status: 'queued' as const,  taskCount: 17,  currentTask: 'Indexing semantic embeddings', successRate: 99, delay: 0.6 },
]

// Sentinel.OS — Central Command Dashboard (3-column glass grid)
// Mirrors Aegis Core "Sentinel.OS — Central Command Dashboard" screen
export function Dashboard() {
  const headerRef = useRef<HTMLDivElement>(null)
  const colLeftRef = useRef<HTMLDivElement>(null)
  const colRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    if (colLeftRef.current) {
      gsap.fromTo(colLeftRef.current, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.15 })
    }
    if (colRightRef.current) {
      gsap.fromTo(colRightRef.current, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.25 })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">

      {/* Background WebGL grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.18} className="w-full h-full" />
      </div>

      <FloatingDock />
      <StreamPanel />

      {/* Main layout — padded from left dock (80px) */}
      <div className="relative z-10 ml-20 min-h-screen p-8">

        {/* Dashboard header */}
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-success rounded-full pulse-active" />
              <span className="text-xs font-semibold text-success uppercase tracking-widest">All Systems Operational</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Central Command</h1>
            <p className="text-sm text-on-surface-variant mt-1">Real-time orchestration of your autonomous agent fleet</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-card rounded-xl px-4 py-2 text-right">
              <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Last Sweep</p>
              <p className="text-sm font-bold text-on-surface font-mono">2m 14s ago</p>
            </div>
            <button className="px-5 py-2.5 bg-primary-container text-on-primary-container text-sm font-semibold
                               rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm">
              Run Full Scan
            </button>
          </div>
        </div>

        {/* Metric cards row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Active Agents"   value={3}        icon={<Cpu size={16} />}           accent="primary"  trend="up"   trendValue="+1"  delay={0.1} />
          <MetricCard label="Issues Found"    value={7}        icon={<AlertTriangle size={16} />}  accent="warning"  trend="down" trendValue="-3"  delay={0.15} />
          <MetricCard label="PRs Merged"      value={24}       icon={<CheckCircle size={16} />}    accent="success"  trend="up"   trendValue="+6"  delay={0.2} />
          <MetricCard label="Coverage"        value="91"  unit="%" icon={<TrendingUp size={16} />} accent="primary"  trend="up"   trendValue="+2%" delay={0.25} />
        </div>

        {/* 3-column content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left column — agent cards */}
          <div ref={colLeftRef} className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-on-surface">Agent Fleet</h2>
              <span className="text-xs text-on-surface-variant">3 active · 2 queued · 1 idle</span>
            </div>

            {AGENTS.map((agent) => (
              <AgentCard key={agent.name} {...agent} />
            ))}
          </div>

          {/* Center column — main panel with scan line */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-sm font-bold text-on-surface mb-2">Security Overview</h2>

            {/* Active scan panel */}
            <div className="glass-card rounded-xl overflow-hidden relative">
              <ScanLine />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-primary" />
                    <span className="text-sm font-bold text-on-surface">Live Scan Progress</span>
                  </div>
                  <span className="text-xs font-mono text-primary font-semibold">68%</span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-surface-container rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-1000"
                    style={{ width: '68%' }}
                  />
                </div>

                {/* Currently scanning */}
                <div className="space-y-2">
                  {[
                    { file: '/src/auth/JWTHandler.ts', status: 'error' },
                    { file: '/src/api/UserController.ts', status: 'success' },
                    { file: '/src/middleware/RateLimiter.ts', status: 'scanning' },
                    { file: '/src/utils/CryptoHelper.ts', status: 'pending' },
                  ].map((f) => (
                    <div key={f.file} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-on-surface-variant truncate max-w-[200px]">{f.file}</span>
                      <span className={
                        f.status === 'error'    ? 'text-error font-semibold' :
                        f.status === 'success'  ? 'text-success font-semibold' :
                        f.status === 'scanning' ? 'text-primary animate-pulse' :
                        'text-outline'
                      }>
                        {f.status === 'scanning' ? '●' : f.status === 'error' ? '!' : f.status === 'success' ? '✓' : '○'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Severity breakdown */}
            <div className="glass-card rounded-xl p-5">
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">Issue Severity</h3>
              {[
                { label: 'Critical', count: 1, color: 'bg-error', pct: 14 },
                { label: 'High',     count: 2, color: 'bg-warning', pct: 28 },
                { label: 'Medium',   count: 3, color: 'bg-primary', pct: 43 },
                { label: 'Low',      count: 1, color: 'bg-outline', pct: 14 },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 mb-2.5">
                  <span className="text-xs w-14 text-on-surface-variant">{s.label}</span>
                  <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="text-xs font-bold text-on-surface w-4 text-right">{s.count}</span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Run Scan',      icon: <Shield size={14} /> },
                { label: 'View Reports',  icon: <TrendingUp size={14} /> },
                { label: 'GitHub Sync',   icon: <Clock size={14} /> },
                { label: 'Audit Logs',    icon: <CheckCircle size={14} /> },
              ].map((a) => (
                <button key={a.label} className="glass-card rounded-xl p-3.5 flex items-center gap-2
                                                  text-sm font-semibold text-on-surface hover:bg-white/90
                                                  card-hover transition-all">
                  <span className="text-primary">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right column — activity feed */}
          <div ref={colRightRef} className="lg:col-span-3">
            <ActivityFeed className="sticky top-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
