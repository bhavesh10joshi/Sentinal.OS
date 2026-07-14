import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Upload, GitBranch, Database, FileCode, CheckCircle, Clock } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'

const SOURCES = [
  { name: 'GitHub — joshb/sentinel-backend',    type: 'GitHub Repo', status: 'active', files: 342, lastScan: '2m ago' },
  { name: 'GitHub — joshb/sentinel-frontend',   type: 'GitHub Repo', status: 'active', files: 186, lastScan: '5m ago' },
  { name: 'GitLab — ops/infra-terraform',       type: 'GitLab Repo', status: 'queued', files: 94,  lastScan: '1h ago' },
  { name: 'Local — /workspace/auth-service',    type: 'Local Path',  status: 'idle',   files: 57,  lastScan: '3h ago' },
  { name: 'S3 — sentinel-audit-logs-bucket',    type: 'Cloud Store', status: 'active', files: 1204, lastScan: '10m ago' },
]

const statusColor = (s: string) =>
  s === 'active' ? 'text-success bg-success-container' :
  s === 'queued' ? 'text-primary bg-primary-fixed' :
  'text-outline bg-surface-container'

// Sentinel.OS — Source Ingestion Core
export function Ingestion() {
  const [dragging, setDragging] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    if (listRef.current) {
      gsap.fromTo(listRef.current.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out', delay: 0.2 })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Source Ingestion Core</h1>
          <p className="text-sm text-on-surface-variant mt-1">Connect repositories, local paths, and cloud stores for continuous analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — source list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-on-surface">Connected Sources</h2>
              <button className="text-xs text-primary font-semibold hover:underline">+ Add Source</button>
            </div>

            <div ref={listRef} className="space-y-3">
              {SOURCES.map((src) => (
                <div key={src.name} className="glass-card rounded-xl p-5 card-hover flex items-center gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary-fixed text-primary">
                    {src.type.includes('GitHub') || src.type.includes('GitLab') ? <GitBranch size={18} /> :
                     src.type.includes('S3') ? <Database size={18} /> : <FileCode size={18} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">{src.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-on-surface-variant">{src.type}</span>
                      <span className="text-xs text-outline">·</span>
                      <span className="text-xs text-on-surface-variant font-mono">{src.files} files</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${statusColor(src.status)}`}>
                      {src.status}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] text-on-surface-variant">Last scan</p>
                      <p className="text-xs font-mono text-on-surface">{src.lastScan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — add source + stats */}
          <div className="space-y-4">

            {/* Drag-and-drop upload zone */}
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Upload Local Source</h3>}>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false) }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${dragging ? 'border-primary bg-primary-fixed/30' : 'border-outline-variant/50 hover:border-primary/50'}`}
              >
                <Upload size={28} className={`mx-auto mb-3 ${dragging ? 'text-primary' : 'text-on-surface-variant'}`} />
                <p className="text-sm font-semibold text-on-surface">Drop folder or file here</p>
                <p className="text-xs text-on-surface-variant mt-1">or click to browse</p>
              </div>
            </GlassCard>

            {/* Quick connect buttons */}
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Quick Connect</h3>}>
              <div className="space-y-2">
                {['GitHub', 'GitLab', 'Bitbucket', 'S3 Bucket', 'Azure Blob'].map((provider) => (
                  <button key={provider} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-surface-container-low/60 hover:bg-surface-container transition-colors text-sm font-medium text-on-surface">
                    <GitBranch size={15} className="text-primary" />
                    {provider}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Ingestion stats */}
            <GlassCard>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Sources', value: '5', icon: <Database size={14} /> },
                  { label: 'Total Files', value: '1,883', icon: <FileCode size={14} /> },
                  { label: 'Queued', value: '94', icon: <Clock size={14} /> },
                  { label: 'Processed', value: '1,789', icon: <CheckCircle size={14} /> },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-surface-container/40">
                    <span className="text-primary flex justify-center mb-1">{s.icon}</span>
                    <p className="text-lg font-bold text-on-surface">{s.value}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
