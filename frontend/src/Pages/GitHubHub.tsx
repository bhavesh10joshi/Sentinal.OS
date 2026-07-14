import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { GitBranch, GitMerge, GitPullRequest, CheckCircle, Clock, AlertTriangle, RefreshCw } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'

const PRS = [
  { id: '#1204', title: 'fix: atomicSessionLookup replaces getCache in verifySession', branch: 'fix/toctou-jwt-142', status: 'merged',  author: 'AutoMerge',  time: '2m ago',  files: 1 },
  { id: '#1205', title: 'fix: parameterize user lookup query in UserController',       branch: 'fix/sqli-user-88',  status: 'review',  author: 'SecurityGuard', time: '5m ago',  files: 1 },
  { id: '#1206', title: 'feat: add rate limiting to /auth/login endpoint',             branch: 'feat/rate-limit',   status: 'pending', author: 'ASTParser',  time: '12m ago', files: 2 },
  { id: '#1207', title: 'refactor: migrate MD5 to SHA-256 in CryptoHelper',           branch: 'refactor/crypto',   status: 'pending', author: 'ASTParser',  time: '18m ago', files: 1 },
]

const prStatus = {
  merged:  { color: 'text-success bg-success-container', icon: <GitMerge size={12} /> },
  review:  { color: 'text-primary bg-primary-fixed',     icon: <GitPullRequest size={12} /> },
  pending: { color: 'text-warning bg-warning-container', icon: <Clock size={12} /> },
}

// Sentinel.OS — GitHub Automation Hub
export function GitHubHub() {
  const [syncing, setSyncing] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  }, [])

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">GitHub Automation Hub</h1>
            <p className="text-sm text-on-surface-variant mt-1">Agent-managed pull requests, merges and repository sync</p>
          </div>
          <button
            onClick={handleSync}
            className={`flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container
                        text-sm font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 ${syncing ? 'opacity-70' : ''}`}
          >
            <RefreshCw size={15} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Open PRs',     value: '2', icon: <GitPullRequest size={16} />, color: 'text-primary' },
            { label: 'Merged Today', value: '1', icon: <GitMerge size={16} />,       color: 'text-success' },
            { label: 'Branches',     value: '4', icon: <GitBranch size={16} />,      color: 'text-primary' },
            { label: 'Auto-Approved', value: '18', icon: <CheckCircle size={16} />,  color: 'text-success' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5 card-hover">
              <span className={s.color}>{s.icon}</span>
              <p className="text-3xl font-extrabold text-on-surface mt-2">{s.value}</p>
              <p className="text-xs text-on-surface-variant mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* PR List */}
        <GlassCard
          header={
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface">Pull Requests</h2>
              <span className="text-xs text-on-surface-variant">Agent-generated</span>
            </div>
          }
        >
          <div className="space-y-3 -mt-1">
            {PRS.map((pr) => {
              const cfg = prStatus[pr.status as keyof typeof prStatus]
              return (
                <div key={pr.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-container/40 hover:bg-surface-container/70 transition-colors">
                  <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${cfg.color}`}>
                    {cfg.icon} {pr.status}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">{pr.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-on-surface-variant font-mono">
                      <GitBranch size={11} />
                      <span className="truncate">{pr.branch}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-primary">{pr.author}</p>
                    <p className="text-[10px] text-on-surface-variant">{pr.time} · {pr.files} file{pr.files !== 1 ? 's' : ''}</p>
                  </div>

                  <span className="text-xs font-mono text-outline">{pr.id}</span>
                </div>
              )
            })}
          </div>
        </GlassCard>

        {/* Config panel */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Auto-Merge Rules</h3>}>
            <div className="space-y-3">
              {[
                { rule: 'Auto-merge if CI passes',          enabled: true },
                { rule: 'Require 1 agent review',           enabled: true },
                { rule: 'Block merge if critical vuln',     enabled: true },
                { rule: 'Draft PRs for medium severity',    enabled: false },
              ].map((r) => (
                <div key={r.rule} className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">{r.rule}</span>
                  <div className={`w-10 h-5 rounded-full transition-colors ${r.enabled ? 'bg-primary' : 'bg-outline-variant'} relative cursor-pointer`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${r.enabled ? 'left-5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Repository Health</h3>}>
            <div className="space-y-3">
              {[
                { label: 'Branch Protection', status: 'enabled', ok: true },
                { label: 'Required Status Checks', status: '3 checks', ok: true },
                { label: 'Code Owner Review', status: 'enabled', ok: true },
                { label: 'Signed Commits', status: 'disabled', ok: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">{item.label}</span>
                  <div className="flex items-center gap-1.5">
                    {item.ok ? <CheckCircle size={13} className="text-success" /> : <AlertTriangle size={13} className="text-warning" />}
                    <span className={`text-xs font-semibold ${item.ok ? 'text-success' : 'text-warning'}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
