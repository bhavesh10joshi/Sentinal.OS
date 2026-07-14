import { useEffect, useRef } from 'react'
import { X, Terminal } from 'lucide-react'
import { gsap } from 'gsap'
import { useAuthStore } from '../Store/useAuthStore'

// Contextual right-side stream panel — push transition from the right
// Matches Aegis Core "Stream Panels" component spec
export function StreamPanel() {
  const open = useAuthStore((s) => s.streamPanelOpen)
  const content = useAuthStore((s) => s.streamPanelContent)
  const close = useAuthStore((s) => s.closeStreamPanel)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelRef.current) return
    if (open) {
      gsap.fromTo(panelRef.current, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' })
    } else {
      gsap.to(panelRef.current, { x: '100%', opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [open])

  // Mock log lines for the selected agent
  const logLines = [
    `[INIT] Agent "${content}" booting...`,
    '[LOAD] Loading AST parser v3.4.2',
    '[SCAN] Parsing /src/auth/JWTHandler.ts',
    '[SCAN] Parsing /src/middleware/AuthGuard.ts',
    '[FIND] Potential issue at line 142: TOCTOU pattern',
    '[AGENT] Invoking Gemini-1.5-Pro for semantic analysis...',
    '[RESULT] Confidence: 94.3% — CRITICAL severity',
    '[PR] Generating remediation diff...',
    '[PR] Pull request #1204 created successfully',
    '[DONE] Scan complete. 1 critical issue resolved.',
  ]

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
          onClick={close}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed right-0 top-0 bottom-0 z-50 w-[380px] glass-panel border-l border-white/40 flex flex-col translate-x-full"
        aria-hidden={!open}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            <span className="text-sm font-bold text-on-surface">{content || 'Agent Logs'}</span>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <X size={16} className="text-on-surface-variant" />
          </button>
        </div>

        {/* Log stream */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-[12px] leading-relaxed space-y-2">
          {logLines.map((line, i) => {
            const type = line.startsWith('[FIND]') || line.startsWith('[RESULT]')
              ? 'error'
              : line.startsWith('[DONE]') || line.startsWith('[PR]')
              ? 'success'
              : 'default'

            return (
              <div
                key={i}
                className={`${
                  type === 'error'   ? 'text-error' :
                  type === 'success' ? 'text-success' :
                  'text-on-surface-variant'
                }`}
              >
                {line}
              </div>
            )
          })}

          {/* Live cursor */}
          <div className="flex items-center gap-1 text-primary">
            <span>&gt;</span>
            <span className="terminal-cursor" />
          </div>
        </div>

        {/* Footer action */}
        <div className="px-5 py-4 border-t border-black/5">
          <button className="w-full py-2.5 bg-primary-container text-on-primary-container text-sm font-semibold rounded-lg
                             hover:scale-[1.02] active:scale-95 transition-all">
            View Full Report
          </button>
        </div>
      </div>
    </>
  )
}
