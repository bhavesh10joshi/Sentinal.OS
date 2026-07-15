import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { BarChart3, Shield, AlertTriangle, FileCode, Loader2, RefreshCw } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

interface Vulnerability {
  id: string
  functionName: string
  vulnerabilityFound: boolean
  severity: string
  issueSummary: string
}

interface ScanReport {
  id: string
  createdAt: string
  fileName: string | null
  totalBlocksScanned: number
  success: boolean
  findings: Vulnerability[]
}

// Sentinel.OS — Analytics
// Derives charts and stats from GET /SentinalOS/api/Analyze/history scan history
export function Analytics() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'
  const [reports, setReports] = useState<ScanReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const headerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  const fetchHistory = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.get(`${VITE_BACKEND_URL}/SentinalOS/api/Analyze/history`, {
        params: { userId },
      })
      setReports(data.history ?? [])
    } catch {
      setError('Failed to load analytics data. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    fetchHistory()
  }, [])

  useEffect(() => {
    if (!loading && reports.length > 0 && chartRef.current) {
      gsap.fromTo(
        chartRef.current.querySelectorAll('.bar-group'),
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out', transformOrigin: 'bottom', delay: 0.2 }
      )
    }
  }, [loading, reports.length])

  // Derive metrics from real data
  const allFindings = reports.flatMap((r) => r.findings)
  const totalVulns = allFindings.filter((f) => f.vulnerabilityFound).length
  const totalBlocks = reports.reduce((sum, r) => sum + r.totalBlocksScanned, 0)
  const successCount = reports.filter((r) => r.success).length
  const countBySev = (sev: string) => allFindings.filter((f) => f.severity === sev && f.vulnerabilityFound).length

  // Build per-scan chart data (last 10 scans)
  const chartData = reports.slice(0, 10).reverse().map((r) => {
    const vulns = r.findings.filter((f) => f.vulnerabilityFound)
    return {
      label: r.fileName ? r.fileName.split('/').pop()?.slice(0, 8) ?? 'raw' : 'raw',
      critical: vulns.filter((v) => v.severity === 'CRITICAL').length,
      high:     vulns.filter((v) => v.severity === 'HIGH').length,
      medium:   vulns.filter((v) => v.severity === 'MEDIUM').length,
    }
  })

  const maxBarVal = Math.max(...chartData.map((d) => d.critical + d.high + d.medium), 1)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <FloatingDock />
        <Loader2 size={32} className="text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.18} className="w-full h-full" />
      </div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Analytics</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Scan trends and vulnerability breakdown derived from your real scan history
            </p>
            <p className="text-xs font-mono text-primary mt-1">workspace: {userId}</p>
          </div>
          <button
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-container text-on-primary-container text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="glass-card rounded-xl p-4 border border-error/20 bg-error-container/20 mb-6">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        {/* New user empty state */}
        {!error && reports.length === 0 && (
          <div className="glass-card rounded-xl p-16 text-center">
            <BarChart3 size={48} className="mx-auto text-outline/30 mb-4" />
            <h3 className="text-lg font-bold text-on-surface mb-2">No scan data yet</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
              Analytics will populate here once you run your first scan.
              Go to <span className="text-primary font-semibold">Playground</span> to scan a code snippet,
              or <span className="text-primary font-semibold">Ingestion</span> to upload a file.
            </p>
          </div>
        )}

        {reports.length > 0 && (
          <>
            {/* KPI row — real numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Scans',     value: String(reports.length),    icon: <Shield size={16} />,      accent: 'text-primary' },
                { label: 'Vulnerabilities', value: String(totalVulns),         icon: <AlertTriangle size={16} />, accent: totalVulns > 0 ? 'text-error' : 'text-success' },
                { label: 'Blocks Scanned',  value: String(totalBlocks),        icon: <FileCode size={16} />,    accent: 'text-primary' },
                { label: 'Success Rate',    value: `${reports.length > 0 ? Math.round((successCount / reports.length) * 100) : 100}%`, icon: <BarChart3 size={16} />, accent: 'text-success' },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-5 card-hover">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{s.label}</span>
                    <span className={s.accent}>{s.icon}</span>
                  </div>
                  <p className="text-3xl font-extrabold text-on-surface">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Severity breakdown row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => {
                const count = countBySev(sev)
                const colors = {
                  CRITICAL: 'bg-error-container text-error border-error/20',
                  HIGH:     'bg-warning-container text-warning border-warning/20',
                  MEDIUM:   'bg-primary-fixed text-primary border-primary/20',
                  LOW:      'bg-surface-container text-outline border-outline-variant/30',
                }
                return (
                  <div key={sev} className={`glass-card rounded-xl p-4 border ${colors[sev]}`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2">{sev}</p>
                    <p className="text-3xl font-extrabold text-on-surface">{count}</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">findings</p>
                  </div>
                )
              })}
            </div>

            {/* Bar chart — per scan */}
            <GlassCard
              className="mb-6"
              header={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-primary" />
                    <h2 className="text-sm font-bold text-on-surface">
                      Vulnerability Count — Last {chartData.length} Scans
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-error inline-block" /> Critical</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning-container inline-block" /> High</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary-container inline-block" /> Medium</span>
                  </div>
                </div>
              }
            >
              <div ref={chartRef} className="flex items-end gap-2 h-52 pt-4">
                {chartData.map((d, i) => {
                  const total = d.critical + d.high + d.medium
                  const critH = (d.critical / maxBarVal) * 100
                  const highH = (d.high / maxBarVal) * 100
                  const medH  = (d.medium / maxBarVal) * 100
                  return (
                    <div key={i} className="bar-group flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: '180px' }}>
                        {medH > 0 && <div className="w-full rounded-t-sm bg-primary-container transition-all" style={{ height: `${medH}%` }} title={`Medium: ${d.medium}`} />}
                        {highH > 0 && <div className="w-full bg-warning-container transition-all" style={{ height: `${highH}%` }} title={`High: ${d.high}`} />}
                        {critH > 0 && <div className="w-full rounded-t-md bg-error/70 transition-all" style={{ height: `${critH}%` }} title={`Critical: ${d.critical}`} />}
                        {total === 0 && (
                          <div className="w-full bg-surface-container rounded-t-md" style={{ height: '8px' }} title="No vulnerabilities" />
                        )}
                      </div>
                      <p className="text-[10px] font-semibold text-on-surface-variant truncate max-w-full px-0.5">{d.label}</p>
                      <p className="text-[10px] font-bold text-on-surface">{total}</p>
                    </div>
                  )
                })}
              </div>
            </GlassCard>

            {/* Recent scans table */}
            <GlassCard header={<h2 className="text-sm font-bold text-on-surface">Scan History Summary</h2>}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      {['File / Source', 'Date', 'Blocks', 'Findings', 'Status'].map((h) => (
                        <th key={h} className="text-left pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {reports.slice(0, 12).map((r) => {
                      const vulnCount = r.findings.filter((f) => f.vulnerabilityFound).length
                      return (
                        <tr key={r.id} className="hover:bg-surface-container/30 transition-colors">
                          <td className="py-3 font-mono text-xs text-primary max-w-[200px] truncate pr-4">
                            {r.fileName ?? 'raw snippet'}
                          </td>
                          <td className="py-3 text-xs text-on-surface-variant pr-4">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 text-on-surface font-semibold pr-4">{r.totalBlocksScanned}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs font-bold ${vulnCount > 0 ? 'text-error' : 'text-success'}`}>
                              {vulnCount === 0 ? 'None' : `${vulnCount} found`}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              r.success ? 'bg-success-container text-success' : 'bg-error-container text-error'
                            }`}>
                              {r.success ? 'OK' : 'Failed'}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </div>
  )
}
