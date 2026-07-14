import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Shield, GitBranch, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'

interface ActivityItem {
  id: string
  type: string
  message: string
  agent: string
  time: string
}

const typeIcon = (type: string) => {
  switch (type) {
    case 'alert':   case 'warning': return <AlertTriangle size={14} className="text-error" />
    case 'success':                 return <CheckCircle size={14} className="text-success" />
    case 'scan':                    return <Shield size={14} className="text-primary" />
    case 'commit':                  return <GitBranch size={14} className="text-tertiary" />
    case 'pending':                 return <Clock size={14} className="text-outline" />
    case 'deploy':                  return <Zap size={14} className="text-warning" />
    default:                        return <Shield size={14} className="text-on-surface-variant" />
  }
}

// Live activity feed — accepts real entries from Dashboard or falls back to empty
export function ActivityFeed({
  entries = [],
  className = '',
}: {
  entries?: ActivityItem[]
  className?: string
}) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (listRef.current && entries.length > 0) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      )
    }
  }, [entries.length])

  if (entries.length === 0) {
    return (
      <div className={`py-8 text-center text-xs text-on-surface-variant ${className}`}>
        No activity yet — run a scan to see events here.
      </div>
    )
  }

  return (
    <ul ref={listRef} className={`divide-y divide-black/[0.04] ${className}`}>
      {entries.map((item) => (
        <li key={item.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-surface-container/30 transition-colors">
          <span className="mt-0.5 flex-shrink-0">{typeIcon(item.type)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-on-surface leading-snug">{item.message}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-primary">{item.agent}</span>
              <span className="text-[10px] text-on-surface-variant">{item.time}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
