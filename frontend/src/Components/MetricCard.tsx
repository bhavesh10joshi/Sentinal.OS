import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'flat'
  trendValue?: string
  icon?: React.ReactNode
  accent?: 'primary' | 'success' | 'warning' | 'error'
  delay?: number
}

const accentMap = {
  primary: 'text-primary bg-primary-fixed',
  success: 'text-success bg-success-container',
  warning: 'text-warning bg-warning-container',
  error:   'text-error bg-error-container',
}

// KPI metric card with GSAP entrance animation — glass surface, accent icon, trend indicator
export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  icon,
  accent = 'primary',
  delay = 0,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay }
      )
    }
  }, [delay])

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-outline'

  return (
    <div ref={ref} className="glass-card rounded-xl p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">{label}</p>
        {icon && (
          <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${accentMap[accent]}`}>
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold text-on-surface tracking-tight">{value}</span>
        {unit && <span className="text-sm text-on-surface-variant mb-1">{unit}</span>}
      </div>

      {trend && trendValue && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendColor}`}>
          <TrendIcon size={12} />
          <span>{trendValue} from last cycle</span>
        </div>
      )}
    </div>
  )
}
