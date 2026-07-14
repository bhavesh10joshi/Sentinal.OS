import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Shield, GitBranch, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'scan' | 'commit' | 'alert' | 'success' | 'pending' | 'deploy'
  message: string
  agent: string
  timestamp: string
}

const SAMPLE_ACTIVITIES: ActivityItem[] = [
  { id: '1', type: 'alert',   message: 'TOCTOU race condition found in verifySession()', agent: 'SecurityGuard', timestamp: '2s ago' },
  { id: '2', type: 'success', message: 'PR #1204 merged — atomicSessionLookup fix', agent: 'AutoMerge', timestamp: '45s ago' },
  { id: '3', type: 'scan',    message: 'AST scan of /src/api — 12 files analysed', agent: 'ASTParser', timestamp: '1m ago' },
  { id: '4', type: 'commit',  message: 'feat: add RBAC layer to admin endpoints', agent: 'GitSync', timestamp: '3m ago' },
  { id: '5', type: 'success', message: 'All 23 tests passed on branch: feature/auth', agent: 'TestRunner', timestamp: '5m ago' },
  { id: '6', type: 'pending', message: 'Queued: Full codebase dependency audit', agent: 'DependBot', timestamp: '8m ago' },
  { id: '7', type: 'deploy',  message: 'Staging environment updated — v4.2.1-rc3', agent: 'DeployAgent', timestamp: '12m ago' },
]

const typeIcon = (type: string) => {
  switch (type) {
    case 'alert':   return <AlertTriangle size={14} className="text-error" />
    case 'success': return <CheckCircle size={14} className="text-success" />
    case 'scan':    return <Shield size={14} className="text-primary" />
    case 'commit':  return <GitBranch size={14} className="text-tertiary" />
    case 'pending': return <Clock size={14} className="text-outline" />
    case 'deploy':  return <Zap size={14} className="text-warning" />
    default:        return null
  }
}

// Live activity feed showing agent events in real-time stream style
export function ActivityFeed({ className = '' }: { className?: string }) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.3 }
      )
    }
  }, [])

  return (
    <div className={`glass-card rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-on-surface">Activity Stream</h3>
        <span className="flex items-center gap-1.5 text-xs text-success font-semibold">
          <span className="w-1.5 h-1.5 bg-success rounded-full pulse-active" />
          Live
        </span>
      </div>

      {/* Feed list */}
      <ul ref={listRef} className="divide-y divide-black/[0.04]">
        {SAMPLE_ACTIVITIES.map((item) => (
          <li key={item.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-surface-container/30 transition-colors">
            <span className="mt-0.5 flex-shrink-0">{typeIcon(item.type)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-on-surface leading-snug">{item.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-primary">{item.agent}</span>
                <span className="text-[10px] text-on-surface-variant">{item.timestamp}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
