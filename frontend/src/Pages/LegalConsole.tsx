import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Gavel, CheckCircle, AlertTriangle, Download, RefreshCw } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'

const FRAMEWORKS = [
  { name: 'GDPR', status: 'compliant',    score: 94, issues: 2 },
  { name: 'SOC 2 Type II', status: 'compliant', score: 91, issues: 3 },
  { name: 'ISO 27001', status: 'partial', score: 78, issues: 7 },
  { name: 'HIPAA', status: 'partial',     score: 65, issues: 12 },
  { name: 'PCI DSS', status: 'review',    score: 48, issues: 18 },
  { name: 'OWASP Top 10', status: 'compliant', score: 88, issues: 4 },
]

const statusCfg = {
  compliant: { color: 'text-success', bg: 'bg-success-container', icon: <CheckCircle size={13} /> },
  partial:   { color: 'text-warning', bg: 'bg-warning-container', icon: <AlertTriangle size={13} /> },
  review:    { color: 'text-error',   bg: 'bg-error-container',   icon: <AlertTriangle size={13} /> },
}

const AUDIT_ITEMS = [
  { id: 'A-001', framework: 'GDPR', control: 'Article 17 — Right to Erasure', status: 'pass',   detail: 'Data deletion endpoints verified' },
  { id: 'A-002', framework: 'GDPR', control: 'Article 32 — Security of Processing', status: 'fail', detail: 'TLS 1.0 still enabled on legacy endpoint' },
  { id: 'A-003', framework: 'SOC2', control: 'CC6.1 — Access Controls', status: 'pass',   detail: 'RBAC policy enforced correctly' },
  { id: 'A-004', framework: 'SOC2', control: 'CC7.1 — Anomaly Detection', status: 'warn',   detail: 'Alert thresholds require manual review' },
  { id: 'A-005', framework: 'ISO 27001', control: 'A.12.1.2 — Change Management', status: 'fail', detail: 'No change approval workflow detected' },
]

const auditStatus = {
  pass: { color: 'text-success', bg: 'bg-success-container', label: 'Pass' },
  fail: { color: 'text-error',   bg: 'bg-error-container',   label: 'Fail' },
  warn: { color: 'text-warning', bg: 'bg-warning-container', label: 'Warn' },
}

// Sentinel.OS — Legal Console Shells
export function LegalConsole() {
  const [auditing, setAuditing] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  }, [])

  const runAudit = () => {
    setAuditing(true)
    setTimeout(() => setAuditing(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Legal Console Shells</h1>
            <p className="text-sm text-on-surface-variant mt-1">GDPR, SOC 2, ISO 27001 and HIPAA compliance audit & reporting</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-sm font-semibold text-on-surface hover:bg-white/80 transition-all">
              <Download size={14} /> Export Report
            </button>
            <button
              onClick={runAudit}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw size={14} className={auditing ? 'animate-spin' : ''} />
              {auditing ? 'Auditing...' : 'Run Full Audit'}
            </button>
          </div>
        </div>

        {/* Framework grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {FRAMEWORKS.map((fw) => {
            const cfg = statusCfg[fw.status as keyof typeof statusCfg]
            return (
              <div key={fw.name} className="glass-card rounded-xl p-5 card-hover">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Gavel size={13} className="text-primary" />
                    <span className="text-on-surface">{fw.name}</span>
                  </div>
                  <span className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon} {fw.status}
                  </span>
                </div>

                {/* Score bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">Compliance Score</span>
                    <span className="font-bold text-on-surface">{fw.score}%</span>
                  </div>
                  <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${fw.score >= 90 ? 'bg-success' : fw.score >= 70 ? 'bg-warning' : 'bg-error'}`}
                      style={{ width: `${fw.score}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant">{fw.issues} issue{fw.issues !== 1 ? 's' : ''} to resolve</p>
              </div>
            )
          })}
        </div>

        {/* Audit findings table */}
        <GlassCard header={
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-on-surface">Audit Control Findings</h2>
            <span className="text-xs text-on-surface-variant">{AUDIT_ITEMS.length} controls evaluated</span>
          </div>
        }>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/30">
                {['ID', 'Framework', 'Control', 'Status', 'Detail'].map((h) => (
                  <th key={h} className="text-left pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {AUDIT_ITEMS.map((item) => {
                const cfg = auditStatus[item.status as keyof typeof auditStatus]
                return (
                  <tr key={item.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-3 font-mono text-xs text-on-surface-variant">{item.id}</td>
                    <td className="py-3 text-xs font-semibold text-primary">{item.framework}</td>
                    <td className="py-3 text-on-surface max-w-xs">{item.control}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-on-surface-variant">{item.detail}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  )
}
