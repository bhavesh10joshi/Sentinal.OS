import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Play, RefreshCw, Loader2, Shield, FileCode, CheckCircle, AlertTriangle } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { MetricCard } from '../Components/MetricCard'
import { AgentCard } from '../Components/AgentCard'
import { ActivityFeed } from '../Components/ActivityFeed'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

// Shapes from GET /SentinalOS/api/Analyze/history
interface Vulnerability {
  id: string
  functionName: string
  vulnerabilityFound: boolean
  severity: string
  issueSummary: string
  remediationCode: string
  startLine: number
  endLine: number
}

interface ScanReport {
  id: string
  createdAt: string
  fileName: string | null
  totalBlocksScanned: number
  success: boolean
  findings: Vulnerability[]
}

// Sentinel.OS — Central Command Dashboard
// Pulls real scan history stats from GET /SentinalOS/api/Analyze/history
export function Dashboard() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'
  const displayName = useAuthStore((s) => s.displayName) ?? 'Operator'

  const [reports, setReports] = useState<ScanReport[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const headerRef = useRef<HTMLDivElement>(null)

  const fetchHistory = async () => {
    setLoading(true)
    try {
      // Send userId as query param — backend reads req.query.userId
      const { data } = await axios.get(`${VITE_BACKEND_URL}/SentinalOS/api/Analyze/history`, {
        params: { userId },
      })
      setReports(data.history ?? [])
      setLastRefresh(new Date())
    } catch {
      // Silently degrade — dashboard still shows with zero-state metrics
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    fetchHistory()
  }, [userId])

  // Derive real metrics from scan history
  const allFindings = reports.flatMap((r) => r.findings)
  const totalVulns = allFindings.filter((f) => f.vulnerabilityFound).length
  const totalBlocks = reports.reduce((sum, r) => sum + r.totalBlocksScanned, 0)
  const successRate = reports.length > 0
    ? Math.round((reports.filter((r) => r.success).length / reports.length) * 100)
    : 100

  const countBySeverity = (sev: string) =>
    allFindings.filter((f) => f.severity === sev && f.vulnerabilityFound).length

  // Most recent scan's file list for the security overview panel
  const latestReport = reports[0] ?? null
  const latestFindings = latestReport?.findings ?? []
  const latestVulns = latestFindings.filter((f) => f.vulnerabilityFound)

  // Build activity feed entries from real scan history (most recent 6)
  const activityEntries = reports.slice(0, 6).map((r) => {
    const vulnCount = r.findings.filter((f) => f.vulnerabilityFound).length
    return {
      id: r.id,
      type: vulnCount > 0 ? 'warning' : 'success',
      message: vulnCount > 0
        ? `${vulnCount} vulnerabilit${vulnCount !== 1 ? 'ies' : 'y'} found in ${r.fileName ?? 'raw snippet'}`
        : `Clean scan — ${r.totalBlocksScanned} blocks verified in ${r.fileName ?? 'raw snippet'}`,
      time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'SecurityGuard',
    }
  })

  const timeSinceRefresh = () => {
    const diff = Math.floor((Date.now() - lastRefresh.getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    return `${Math.floor(diff / 60)}m ago`
  }

  const AGENTS = [
    {
      name: 'SecurityGuard',
      role: 'Vulnerability Detection',
      model: 'GEMINI',
      status: 'active' as const,
      currentTask: latestReport ? `Analysed ${latestReport.fileName ?? 'raw snippet'}` : 'Idle — awaiting scan jobs',
      taskCount: reports.length,
      successRate: successRate,
    },
    {
      name: 'ASTParser',
      role: 'Syntax Tree Analysis',
      model: 'TREE-SITTER',
      status: 'active' as const,
      currentTask: `${totalBlocks} code blocks parsed across ${reports.length} scans`,
      taskCount: totalBlocks,
      successRate: successRate,
    },
    {
      name: 'VectorStore',
      role: 'Semantic Embedding',
      model: 'PINECONE',
      status: 'queued' as const,
      currentTask: `Indexing code chunks into user namespace: ${userId}`,
      taskCount: reports.length,
      successRate: 100,
    },
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.18} className="w-full h-full" />
      </div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">

        {/* Header */}
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-semibold text-success uppercase tracking-widest">
                All Systems Operational
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Central Command</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Real-time orchestration · Workspace:{' '}
              <span className="font-mono text-primary">{userId}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">Last refresh</p>
              <p className="text-sm font-mono font-semibold text-on-surface">{timeSinceRefresh()}</p>
            </div>
            <button
              onClick={fetchHistory}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-3 bg-primary-container text-on-primary-container
                         text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* KPI Metric cards — derived from real history */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Total Scans"
            value={loading ? '...' : reports.length}
            trend={reports.length > 0 ? 'up' : 'flat'}
            trendValue={reports.length > 0 ? `+${reports.length} all time` : undefined}
            accent="primary"
            icon={<Shield size={16} />}
          />
          <MetricCard
            label="Vulnerabilities"
            value={loading ? '...' : totalVulns}
            trend={totalVulns === 0 ? 'flat' : 'down'}
            trendValue={totalVulns > 0 ? `${countBySeverity('CRITICAL')} critical` : undefined}
            accent={totalVulns > 0 ? 'error' : 'success'}
            icon={<AlertTriangle size={16} />}
          />
          <MetricCard
            label="Blocks Scanned"
            value={loading ? '...' : totalBlocks}
            trend="up"
            trendValue={totalBlocks > 0 ? 'AST function blocks' : undefined}
            accent="primary"
            icon={<FileCode size={16} />}
          />
          <MetricCard
            label="Success Rate"
            value={loading ? '...' : `${successRate}%`}
            trend={successRate >= 80 ? 'up' : 'down'}
            trendValue={reports.length > 0 ? `${reports.filter((r) => r.success).length}/${reports.length} scans` : undefined}
            accent={successRate >= 80 ? 'success' : 'warning'}
            icon={<CheckCircle size={16} />}
          />
        </div>

        {/* 3-column main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Agent fleet */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface">Agent Fleet</h2>
              <span className="text-xs text-on-surface-variant">
                {reports.length > 0 ? '3 active' : 'Idle'}
              </span>
            </div>
            {AGENTS.map((agent) => (
              <AgentCard key={agent.name} {...agent} />
            ))}
          </div>

          {/* Security overview */}
          <div className="lg:col-span-1">
            <GlassCard header={
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-on-surface">Security Overview</h2>
                {loading && <Loader2 size={13} className="text-primary animate-spin" />}
              </div>
            }>
              {latestReport ? (
                <>
                  {/* Last scan progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-primary" />
                        <span className="text-xs font-semibold text-on-surface">Latest Scan</span>
                      </div>
                      <span className="text-xs font-bold text-primary">
                        {latestReport.totalBlocksScanned} blocks
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface-container rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-primary-container rounded-full w-full" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-mono text-on-surface truncate">
                        {latestReport.fileName ?? 'raw snippet'}
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        {new Date(latestReport.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Issue severity breakdown */}
                  <div>
                    <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                      Issue Severity
                    </p>
                    {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => {
                      const count = countBySeverity(sev)
                      const maxCount = Math.max(countBySeverity('CRITICAL'), countBySeverity('HIGH'), countBySeverity('MEDIUM'), 1)
                      const pct = (count / maxCount) * 100
                      return (
                        <div key={sev} className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] w-14 text-on-surface-variant">{sev}</span>
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                sev === 'CRITICAL' ? 'bg-error' :
                                sev === 'HIGH' ? 'bg-warning-container' :
                                sev === 'MEDIUM' ? 'bg-primary-container' : 'bg-surface-container-high'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-on-surface w-4 text-right">{count}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Latest vulnerabilities list */}
                  {latestVulns.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-black/5">
                      <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                        Recent Findings
                      </p>
                      {latestVulns.slice(0, 3).map((f) => (
                        <div key={f.id} className="flex items-center gap-2 mb-1.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            f.severity === 'CRITICAL' ? 'bg-error-container text-error' :
                            f.severity === 'HIGH' ? 'bg-warning-container text-warning' :
                            'bg-primary-fixed text-primary'
                          }`}>{f.severity}</span>
                          <span className="text-[11px] font-mono text-on-surface truncate flex-1">{f.functionName}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <Shield size={32} className="mx-auto text-outline/30 mb-3" />
                  <p className="text-xs text-on-surface-variant">
                    No scans yet. Run a scan from <span className="text-primary font-semibold">Playground</span>.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Activity stream */}
          <div className="lg:col-span-1">
            <GlassCard header={
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-on-surface">Activity Stream</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-semibold text-success uppercase tracking-wider">Live</span>
                </div>
              </div>
            }>
              {activityEntries.length > 0 ? (
                <ActivityFeed entries={activityEntries} />
              ) : (
                <div className="py-8 text-center">
                  <p className="text-xs text-on-surface-variant">
                    Activity feed will populate as scans run.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
