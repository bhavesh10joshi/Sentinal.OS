import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { AgentStatusBadge } from './AgentStatusBadge'
import { useAuthStore } from '../Store/useAuthStore'

type AgentStatus = 'active' | 'queued' | 'idle' | 'error'

interface AgentCardProps {
  name: string
  role: string
  status: AgentStatus
  taskCount?: number
  currentTask?: string
  model?: string
  successRate?: number
  delay?: number
}

// Individual agent tile with live status, task info, and stream panel trigger
export function AgentCard({
  name,
  role,
  status,
  taskCount = 0,
  currentTask,
  model = 'Gemini 1.5 Pro',
  successRate = 98,
  delay = 0,
}: AgentCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const openStreamPanel = useAuthStore((s) => s.openStreamPanel)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay }
      )
    }
  }, [delay])

  return (
    <div
      ref={ref}
      onClick={() => openStreamPanel(name, role)}
      className="glass-card rounded-xl p-5 card-hover cursor-pointer group relative overflow-hidden"
    >
      {/* Specular highlight top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-on-surface tracking-tight">{name}</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">{role}</p>
        </div>
        <AgentStatusBadge status={status} size="sm" />
      </div>

      {/* Model badge */}
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-semibold uppercase tracking-wider">
        {model}
      </span>

      {/* Current task */}
      {currentTask && status !== 'idle' && (
        <div className="mt-3 p-2.5 rounded-lg bg-surface-container/60 border border-outline-variant/20">
          <p className="text-[11px] text-on-surface-variant font-medium uppercase tracking-wider mb-1">Processing</p>
          <p className="text-xs text-on-surface font-mono truncate">{currentTask}</p>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5 text-xs text-on-surface-variant">
        <span><span className="font-bold text-on-surface">{taskCount}</span> tasks</span>
        <span>
          <span className="font-bold text-success">{successRate}%</span> success
        </span>
        <span className="text-primary group-hover:underline">View Logs</span>
      </div>
    </div>
  )
}
