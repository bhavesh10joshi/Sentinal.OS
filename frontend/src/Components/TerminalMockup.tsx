import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const BOOT_LINES = [
  { text: 'sentinel@os:~$ sentinel scan --path ./src/auth', type: 'cmd' },
  { text: 'Initializing WASM Tree-Sitter engine...', type: 'info' },
  { text: 'Orchestrating Gemini-1.5-Pro code-review agents...', type: 'info' },
  { text: '', type: 'gap' },
  { text: '● Scanning: JWTHandler.ts', type: 'scan' },
  { text: '● Scanning: AuthMiddleware.ts', type: 'scan' },
  { text: '● Scanning: SessionController.ts', type: 'scan' },
  { text: '', type: 'gap' },
  { text: 'CRITICAL: TOCTOU Race Condition detected in verifySession()', type: 'error' },
  { text: 'Agent "SecurityGuard" generated remediation PR #1204', type: 'success' },
  { text: '✓ All 47 files scanned. 1 critical, 3 warnings found.', type: 'done' },
]

// Animated terminal mockup with typewriter effect — matches Aegis Core terminal block
export function TerminalMockup({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleLines, setVisibleLines] = useState<number>(0)

  useEffect(() => {
    // Reveal lines one by one
    let i = 0
    const timer = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= BOOT_LINES.length) clearInterval(timer)
    }, 280)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    }
  }, [])

  const lineClass = (type: string) => {
    switch (type) {
      case 'cmd':     return 'text-primary font-bold'
      case 'info':    return 'text-on-surface-variant opacity-70 italic'
      case 'scan':    return 'text-primary-container flex items-center gap-2'
      case 'error':   return 'text-error font-semibold'
      case 'success': return 'text-success font-medium'
      case 'done':    return 'text-on-surface font-semibold'
      default:        return ''
    }
  }

  return (
    <div
      ref={containerRef}
      className={`glass-card rounded-xl overflow-hidden shadow-glass-lg border border-white/20 ${className}`}
    >
      {/* Terminal chrome header */}
      <div className="bg-surface-container-highest/50 px-4 py-3 flex items-center justify-between border-b border-black/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error/50" />
          <div className="w-3 h-3 rounded-full bg-warning-container" />
          <div className="w-3 h-3 rounded-full bg-success/50" />
        </div>
        <span className="text-xs font-mono text-on-surface-variant">sentinel-agent --analyze-ast</span>
        <div className="w-6" />
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-[13px] leading-relaxed bg-surface-container-lowest/40 min-h-[360px] relative">
        <div className="space-y-1.5">
          {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
            <div key={idx} className={lineClass(line.type)}>
              {line.type === 'gap' ? <br /> : line.text}
            </div>
          ))}

          {/* Blinking cursor at the end */}
          {visibleLines >= BOOT_LINES.length && (
            <div className="flex items-center gap-1 text-primary font-bold mt-2">
              sentinel@os:~$ <span className="terminal-cursor ml-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
