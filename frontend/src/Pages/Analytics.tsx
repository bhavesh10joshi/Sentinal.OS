import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TrendingDown, TrendingUp, BarChart3, Clock, Shield, CheckCircle } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'

// Weekly vulnerability trend data
const WEEKLY_VULNS = [
  { day: 'Mon', critical: 3, high: 5, medium: 8 },
  { day: 'Tue', critical: 2, high: 4, medium: 6 },
  { day: 'Wed', critical: 4, high: 7, medium: 9 },
  { day: 'Thu', critical: 1, high: 3, medium: 5 },
  { day: 'Fri', critical: 2, high: 4, medium: 7 },
  { day: 'Sat', critical: 0, high: 1, medium: 3 },
  { day: 'Sun', critical: 1, high: 2, medium: 4 },
]

const maxVal = Math.max(...WEEKLY_VULNS.map((d) => d.critical + d.high + d.medium))

// Sentinel.OS — Historic Analytics Vault
export function Analytics() {
  const headerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current.querySelectorAll('.bar-group'),
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out', transformOrigin: 'bottom', delay: 0.3 }
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Historic Analytics Vault</h1>
            <p className="text-sm text-on-surface-variant mt-1">Vulnerability trends, fix velocity, and agent performance over time</p>
          </div>
          <div className="flex gap-2">
            {['7D', '30D', '90D', 'All'].map((r) => (
              <button key={r} className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                r === '7D' ? 'bg-primary-container text-on-primary-container' : 'glass-card text-on-surface-variant hover:text-on-surface'
              }`}>{r}</button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Vulns Found', value: '47',  trend: 'down', change: '-18%', icon: <Shield size={16} />,       accent: 'text-success' },
            { label: 'Auto-Fixed',        value: '39',  trend: 'up',   change: '+22%', icon: <CheckCircle size={16} />,  accent: 'text-primary' },
            { label: 'Mean Fix Time',     value: '4.2', unit: 'min',   change: '-35%', trend: 'down', icon: <Clock size={16} />, accent: 'text-success' },
            { label: 'Coverage Growth',   value: '+7',  unit: '%',     change: 'this week', trend: 'up', icon: <TrendingUp size={16} />, accent: 'text-primary' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-5 card-hover">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{s.label}</span>
                <span className={s.accent}>{s.icon}</span>
              </div>
              <p className="text-3xl font-extrabold text-on-surface">{s.value}{s.unit && <span className="text-lg font-medium ml-1">{s.unit}</span>}</p>
              <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${s.accent}`}>
                {s.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Main chart */}
        <GlassCard
          className="mb-6"
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-primary" />
                <h2 className="text-sm font-bold text-on-surface">Vulnerability Trend — Last 7 Days</h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-error inline-block" /> Critical</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning-container inline-block" /> High</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Medium</span>
              </div>
            </div>
          }
        >
          <div ref={chartRef} className="flex items-end gap-4 h-52 pt-4">
            {WEEKLY_VULNS.map((d) => {
              const total = d.critical + d.high + d.medium
              const critH = (d.critical / maxVal) * 100
              const highH = (d.high / maxVal) * 100
              const medH  = (d.medium / maxVal) * 100
              return (
                <div key={d.day} className="bar-group flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: '180px' }}>
                    <div className="w-full rounded-t-sm bg-primary/70 transition-all" style={{ height: `${medH}%` }} title={`Medium: ${d.medium}`} />
                    <div className="w-full bg-warning-container transition-all" style={{ height: `${highH}%` }} title={`High: ${d.high}`} />
                    <div className="w-full rounded-t-md bg-error/70 transition-all" style={{ height: `${critH}%` }} title={`Critical: ${d.critical}`} />
                  </div>
                  <p className="text-[11px] font-semibold text-on-surface-variant">{d.day}</p>
                  <p className="text-[10px] font-bold text-on-surface">{total}</p>
                </div>
              )
            })}
          </div>
        </GlassCard>

        {/* Agent performance table */}
        <GlassCard header={<h2 className="text-sm font-bold text-on-surface">Agent Performance</h2>}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/30">
                {['Agent', 'Tasks Run', 'Issues Found', 'Auto-Fixed', 'Success Rate', 'Avg Time'].map((h) => (
                  <th key={h} className="text-left pb-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {[
                { name: 'SecurityGuard',  tasks: 142, found: 31, fixed: 29, rate: '98.6%', avg: '2.1m' },
                { name: 'ASTParser',      tasks: 89,  found: 12, fixed: 11, rate: '100%',  avg: '0.8m' },
                { name: 'AutoMerge',      tasks: 34,  found: 0,  fixed: 24, rate: '97.1%', avg: '0.3m' },
                { name: 'TestRunner',     tasks: 56,  found: 4,  fixed: 4,  rate: '96.4%', avg: '3.5m' },
                { name: 'DependBot',      tasks: 21,  found: 6,  fixed: 5,  rate: '83.3%', avg: '5.2m' },
              ].map((a) => (
                <tr key={a.name} className="hover:bg-surface-container/30 transition-colors">
                  <td className="py-3 font-mono font-semibold text-primary">{a.name}</td>
                  <td className="py-3 text-on-surface">{a.tasks}</td>
                  <td className="py-3 text-on-surface">{a.found}</td>
                  <td className="py-3 text-success font-semibold">{a.fixed}</td>
                  <td className="py-3 text-success font-bold">{a.rate}</td>
                  <td className="py-3 font-mono text-on-surface-variant">{a.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  )
}
