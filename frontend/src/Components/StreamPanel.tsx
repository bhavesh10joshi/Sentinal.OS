import { useEffect, useRef, useState } from 'react'
import { X, Terminal, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react'
import { gsap } from 'gsap'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

// Shape returned by GET /SentinalOS/api/Analyze/status/:jobId
interface JobStatusResponse {
  success: boolean
  status: 'WAITING' | 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'UNKNOWN'
  progress?: number
  result?: any
  reason?: string
}

// Contextual right-side stream panel — polls backend job status and streams log lines
// Matches Aegis Core "Stream Panels" component spec
export function StreamPanel() {
  const open = useAuthStore((s) => s.streamPanelOpen)
  const jobId = useAuthStore((s) => s.streamPanelJobId)
  const label = useAuthStore((s) => s.streamPanelLabel)
  const close = useAuthStore((s) => s.closeStreamPanel)

  const panelRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<HTMLDivElement>(null)

  const [logLines, setLogLines] = useState<{ text: string; type: string }[]>([])
  const [jobStatus, setJobStatus] = useState<string>('WAITING')
  const [progress, setProgress] = useState<number>(0)
  const [findings, setFindings] = useState<any[]>([])

  // GSAP slide animation
  useEffect(() => {
    if (!panelRef.current) return
    if (open) {
      gsap.fromTo(panelRef.current, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' })
    } else {
      gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [open])

  // Reset state when a new jobId comes in
  useEffect(() => {
    if (!open || !jobId) return
    setLogLines([])
    setJobStatus('WAITING')
    setProgress(0)
    setFindings([])
    setLogLines([
      { text: `[INIT] Job ${jobId} queued for processing`, type: 'info' },
      { text: '[LOAD] BullMQ worker picking up scan task...', type: 'info' },
    ])
  }, [open, jobId])

  // Poll job status every 2 seconds until COMPLETED or FAILED
  useEffect(() => {
    if (!open || !jobId) return

    const poll = async () => {
      try {
        const { data }: { data: JobStatusResponse } = await axios.get(
          `${VITE_BACKEND_URL}/SentinalOS/api/Analyze/status/${jobId}`
        )

        setJobStatus(data.status)
        setProgress(data.progress ?? 0)

        if (data.status === 'ACTIVE') {
          setLogLines((prev) => [...prev, { text: '[AGENT] Tree-Sitter AST parser running...', type: 'info' }])
          setLogLines((prev) => [...prev, { text: '[AGENT] Sending blocks to Gemini AI for analysis...', type: 'agent' }])
        }

        if (data.status === 'COMPLETED' && data.result) {
          const vulns = data.result?.findings ?? []
          setFindings(vulns)
          setLogLines((prev) => [
            ...prev,
            { text: `[DONE] Scan complete. ${vulns.length} function blocks analyzed.`, type: 'success' },
          ])
          vulns.forEach((v: any) => {
            if (v.vulnerabilityFound) {
              setLogLines((prev) => [
                ...prev,
                { text: `[${v.severity}] ${v.functionName}: ${v.issueSummary}`, type: 'error' },
              ])
            }
          })
          return true // stop polling
        }

        if (data.status === 'FAILED') {
          setLogLines((prev) => [
            ...prev,
            { text: `[FAILED] ${data.reason ?? 'Worker pipeline crashed unexpectedly.'}`, type: 'error' },
          ])
          return true // stop polling
        }

      } catch (err) {
        setLogLines((prev) => [...prev, { text: '[WARN] Status endpoint unreachable — retrying...', type: 'warn' }])
      }
      return false
    }

    let pollInterval: ReturnType<typeof setInterval>

    const start = async () => {
      const done = await poll()
      if (!done) {
        pollInterval = setInterval(async () => {
          const finished = await poll()
          if (finished) clearInterval(pollInterval)
        }, 2500)
      }
    }

    start()
    return () => clearInterval(pollInterval)
  }, [open, jobId])

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight
    }
  }, [logLines])

  const lineColor = (type: string) => {
    switch (type) {
      case 'error':   return 'text-error'
      case 'success': return 'text-success'
      case 'agent':   return 'text-primary'
      case 'warn':    return 'text-warning'
      default:        return 'text-on-surface-variant'
    }
  }

  const isRunning = jobStatus === 'WAITING' || jobStatus === 'ACTIVE'

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]" onClick={close} />
      )}

      <div
        ref={panelRef}
        className="fixed right-0 top-0 bottom-0 z-50 w-[400px] glass-panel border-l border-white/40 flex flex-col translate-x-full"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            <span className="text-sm font-bold text-on-surface truncate max-w-[260px]">
              {label || 'Job Stream'}
            </span>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <X size={16} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Job status bar */}
        <div className="px-5 py-3 border-b border-black/5 bg-surface-container-lowest/40">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {isRunning ? (
                <Loader2 size={13} className="text-primary animate-spin" />
              ) : jobStatus === 'COMPLETED' ? (
                <CheckCircle size={13} className="text-success" />
              ) : (
                <AlertTriangle size={13} className="text-error" />
              )}
              <span className="text-xs font-semibold text-on-surface">{jobStatus}</span>
            </div>
            <span className="text-xs font-mono text-on-surface-variant">{progress}%</span>
          </div>
          <div className="h-1 bg-surface-container rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                jobStatus === 'COMPLETED' ? 'bg-success' :
                jobStatus === 'FAILED'    ? 'bg-error' :
                'bg-primary-container'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {jobId && (
            <p className="text-[10px] font-mono text-on-surface-variant mt-1.5">Job ID: {jobId}</p>
          )}
        </div>

        {/* Log stream terminal */}
        <div
          ref={termRef}
          className="flex-1 overflow-y-auto p-5 font-mono text-[12px] leading-relaxed space-y-1.5 bg-surface-container-lowest/20"
        >
          {logLines.map((line, i) => (
            <div key={i} className={lineColor(line.type)}>{line.text}</div>
          ))}

          {isRunning && (
            <div className="flex items-center gap-1.5 text-primary mt-2">
              <Loader2 size={11} className="animate-spin" />
              <span className="animate-pulse text-[11px]">Processing...</span>
            </div>
          )}

          {jobStatus === 'COMPLETED' && (
            <div className="flex items-center gap-1 text-primary mt-2">
              <span>&gt;</span>
              <span className="terminal-cursor" />
            </div>
          )}
        </div>

        {/* Findings summary (only shown after completion) */}
        {jobStatus === 'COMPLETED' && findings.length > 0 && (
          <div className="px-5 py-4 border-t border-black/5 max-h-40 overflow-y-auto">
            <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
              Findings Summary
            </p>
            {findings.filter((f: any) => f.vulnerabilityFound).map((f: any, i: number) => (
              <div key={i} className="flex items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  f.severity === 'CRITICAL' ? 'bg-error-container text-error' :
                  f.severity === 'HIGH' ? 'bg-warning-container text-warning' :
                  'bg-primary-fixed text-primary'
                }`}>{f.severity}</span>
                <span className="text-[11px] text-on-surface font-mono truncate">{f.functionName}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="px-5 py-4 border-t border-black/5">
          <button
            onClick={() => { close(); window.location.href = '/Sentinel/Diagnostics' }}
            className="w-full py-2.5 bg-primary-container text-on-primary-container text-sm font-semibold rounded-lg
                       hover:scale-[1.02] active:scale-95 transition-all"
          >
            View Full Diagnostic Report
          </button>
        </div>
      </div>
    </>
  )
}
