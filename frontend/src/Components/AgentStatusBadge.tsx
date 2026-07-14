// Aegis-style breathing status dot with label
type AgentStatus = 'active' | 'queued' | 'idle' | 'error'

interface AgentStatusBadgeProps {
  status: AgentStatus
  label?: string
  size?: 'sm' | 'md'
}

const statusConfig: Record<AgentStatus, { color: string; bg: string; pulse: string; text: string }> = {
  active: {
    color: '#1a7f45',
    bg: 'bg-success',
    pulse: 'pulse-active',
    text: 'text-success',
  },
  queued: {
    color: '#0059b5',
    bg: 'bg-primary',
    pulse: 'pulse-queued',
    text: 'text-primary',
  },
  idle: {
    color: '#717785',
    bg: 'bg-outline',
    pulse: '',
    text: 'text-outline',
  },
  error: {
    color: '#ba1a1a',
    bg: 'bg-error',
    pulse: 'pulse-active',
    text: 'text-error',
  },
}

// Breathing status indicator dot matching Aegis Core status indicators
export function AgentStatusBadge({ status, label, size = 'md' }: AgentStatusBadgeProps) {
  const cfg = statusConfig[status]
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className="flex items-center gap-2">
      <span
        className={`${dotSize} ${cfg.bg} ${cfg.pulse} rounded-full inline-block`}
        style={{ boxShadow: `0 0 6px ${cfg.color}60` }}
      />
      {label && (
        <span className={`${textSize} font-medium ${cfg.text}`}>{label}</span>
      )}
    </div>
  )
}
