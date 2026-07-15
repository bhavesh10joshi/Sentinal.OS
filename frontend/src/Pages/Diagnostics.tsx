import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  AlertTriangle, Shield, CheckCircle, Code, ChevronDown, ChevronUp,
  RefreshCw, Loader2
} from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

// Shapes returned by GET /SentinalOS/api/Analyze/history
interface Vulnerability {
  id: string
  functionName: string
  startLine: number
  endLine: number
  vulnerabilityFound: boolean
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE'
  issueSummary: string
  remediationCode: string
}

interface ScanReport {
  id: string
  createdAt: string
  userId: string
  fileName: string | null
  totalBlocksScanned: number
  success: boolean
  findings: Vulnerability[]
}

const severityConfig = {
  CRITICAL: { bg: 'bg-error-container', text: 'text-error', border: 'border-error/20', icon: <AlertTriangle size={14} /> },
  HIGH:     { bg: 'bg-warning-container', text: 'text-warning', border: 'border-warning/20', icon: <AlertTriangle size={14} /> },
  MEDIUM:   { bg: 'bg-primary-fixed', text: 'text-primary', border: 'border-primary/20', icon: <Shield size={14} /> },
  LOW:      { bg: 'bg-surface-container', text: 'text-outline', border: 'border-outline-variant/30', icon: <CheckCircle size={14} /> },
  NONE:     { bg: 'bg-surface-container', text: 'text-outline', border: 'border-outline-variant/30', icon: <CheckCircle size={14} /> },
}

// Sentinel.OS — Diagnostic Results View
// Connects to: GET /SentinalOS/api/Analyze/history (body: userId)
export function Diagnostics() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'

  const [reports, setReports] = useState<ScanReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [])

  // Fetch full scan history from the backend
  const fetchHistory = async () => {
    setLoading(true)
    setError('')
    try {
      // Send userId as query param — backend reads req.query.userId
      const { data } = await axios.get(`${VITE_BACKEND_URL}/SentinalOS/api/Analyze/history`, {
        params: { userId },
      })
      setReports(data.history ?? [])
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Failed to load scan history. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [userId])

  // Animate list after data loads
  useEffect(() => {
    if (!loading && reports.length > 0) {
      gsap.fromTo('.diag-row', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: 'power2.out' })
    }
  }, [loading, reports])

  // Flatten all findings across all reports for the summary bar
  const allFindings = reports.flatMap((r) => r.findings)
  const countBySeverity = (sev: string) => allFindings.filter((f) => f.severity === sev && f.vulnerabilityFound).length

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
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Diagnostic Results</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              {loading ? 'Loading scan history...' : `${reports.length} scan reports for workspace "${userId}"`}
            </p>
          </div>
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-container text-on-primary-container
                       text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6 glass-card rounded-xl p-5 border border-error/20 bg-error-container/30">
            <p className="text-sm text-error font-medium">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={32} className="text-primary animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reports.length === 0 && (
          <div className="glass-card rounded-xl p-16 text-center">
            <Shield size={48} className="mx-auto text-outline/30 mb-4" />
            <h3 className="text-lg font-bold text-on-surface mb-2">No scans yet</h3>
            <p className="text-sm text-on-surface-variant">
              Submit a code scan from the <span className="text-primary font-semibold">Playground</span> or{' '}
              <span className="text-primary font-semibold">Ingestion</span> pages to see results here.
            </p>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <>
            {/* Severity summary bar */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => {
                const cfg = severityConfig[sev]
                const count = countBySeverity(sev)
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

            {/* Scan reports accordion */}
            <div className="space-y-4">
              {reports.map((report) => {
                const vulnFindings = report.findings.filter((f) => f.vulnerabilityFound)
                const isExpanded = expanded === report.id

                return (
                  <div key={report.id} className="glass-card rounded-xl overflow-hidden diag-row">

                    {/* Report header */}
                    <button
                      onClick={() => setExpanded(isExpanded ? null : report.id)}
                      className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/60 transition-colors"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${report.success ? 'bg-success' : 'bg-error'}`} />
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-bold text-on-surface truncate">
                          {report.fileName ?? 'Raw Snippet'}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          {new Date(report.createdAt).toLocaleString()} · {report.totalBlocksScanned} blocks scanned
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {vulnFindings.length > 0 && (
                          <span className="text-xs font-bold text-error bg-error-container px-2 py-0.5 rounded-full">
                            {vulnFindings.length} vuln{vulnFindings.length !== 1 ? 's' : ''}
                          </span>
                        )}
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          report.success ? 'bg-success-container text-success' : 'bg-error-container text-error'
                        }`}>
                          {report.success ? 'Success' : 'Failed'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-on-surface-variant" />
                        ) : (
                          <ChevronDown size={16} className="text-on-surface-variant" />
                        )}
                      </div>
                    </button>

                    {/* Expanded findings */}
                    {isExpanded && (
                      <div className="border-t border-black/5 divide-y divide-black/[0.04]">
                        {report.findings.length === 0 ? (
                          <div className="px-5 py-6 text-sm text-on-surface-variant text-center">
                            No function-level findings stored for this scan.
                          </div>
                        ) : (
                          report.findings.map((finding) => {
                            const cfg = severityConfig[finding.severity] ?? severityConfig['LOW']
                            return (
                              <div key={finding.id} className="px-5 py-4">
                                <div className="flex items-start gap-3 mb-3">
                                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.bg} ${cfg.text}`}>
                                    {cfg.icon} {finding.severity}
                                  </span>
                                  <div>
                                    <p className="text-sm font-bold text-on-surface font-mono">{finding.functionName}</p>
                                    <p className="text-xs text-on-surface-variant mt-0.5">
                                      Lines {finding.startLine}–{finding.endLine}
                                    </p>
                                  </div>
                                </div>

                                <p className="text-xs text-on-surface-variant mb-3">{finding.issueSummary}</p>

                                {finding.remediationCode && (
                                  <div className="rounded-xl overflow-hidden border border-on-surface/10">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-on-surface/5 border-b border-on-surface/5">
                                      <Code size={13} className="text-on-surface-variant" />
                                      <span className="text-xs font-semibold text-on-surface-variant">
                                        AI Remediation Suggestion
                                      </span>
                                    </div>
                                    <pre className="p-4 text-[12px] font-mono bg-on-surface text-surface leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                      {finding.remediationCode}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
