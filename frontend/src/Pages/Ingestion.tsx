import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Upload, FileCode, Database, GitBranch, CheckCircle, Clock, Loader2, X } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

// Queued job entry tracked locally after upload
interface QueuedJob {
  jobId: string
  fileName: string
  timestamp: string
  status: 'queued' | 'processing' | 'done' | 'failed'
}

// Sentinel.OS — Source Ingestion Core
// Connects to: POST /SentinalOS/api/Analyze/file (multipart/form-data upload)
export function Ingestion() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'
  const openStreamPanel = useAuthStore((s) => s.openStreamPanel)

  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [queuedJobs, setQueuedJobs] = useState<QueuedJob[]>([])
  const [error, setError] = useState('')

  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out', delay: 0.2 }
      )
    }
  }, [])

  // Validate file — backend only accepts .ts / .js / .cpp
  const validateFile = (file: File) => {
    const allowed = ['.ts', '.js', '.cpp']
    return allowed.some((ext) => file.name.endsWith(ext))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    if (!validateFile(file)) {
      setError('Only .ts, .js, and .cpp files are accepted by the backend.')
      return
    }
    setPendingFile(file)
    setError('')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    if (!validateFile(file)) {
      setError('Only .ts, .js, and .cpp files are accepted by the backend.')
      return
    }
    setPendingFile(file)
    setError('')
  }

  // Upload to POST /SentinalOS/api/Analyze/file
  const handleUpload = async () => {
    if (!pendingFile) return
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('codeFile', pendingFile)
      formData.append('userId', userId)

      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/SentinalOS/api/Analyze/file`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      const newJob: QueuedJob = {
        jobId: data.jobId,
        fileName: pendingFile.name,
        timestamp: new Date().toLocaleTimeString(),
        status: 'queued',
      }

      setQueuedJobs((prev) => [newJob, ...prev])
      setPendingFile(null)
      // Open stream panel to show live progress
      openStreamPanel(data.jobId, `File Scan — ${pendingFile.name}`)
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Upload failed. Ensure the backend is running and the file type is supported.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.18} className="w-full h-full" />
      </div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Source Ingestion Core</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Upload <span className="font-mono text-primary">.ts</span>,{' '}
            <span className="font-mono text-primary">.js</span>, or{' '}
            <span className="font-mono text-primary">.cpp</span> files for AST parsing and AI security review
          </p>
          <p className="text-xs font-mono text-primary mt-1">workspace: {userId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — queued jobs list */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-on-surface">Queued Scans</h2>
              <span className="text-xs text-on-surface-variant">{queuedJobs.length} in session queue</span>
            </div>

            {queuedJobs.length === 0 ? (
              <div className="glass-card rounded-xl p-10 text-center">
                <FileCode size={40} className="mx-auto text-outline/30 mb-3" />
                <p className="text-sm text-on-surface-variant">No files uploaded yet this session</p>
                <p className="text-xs text-outline mt-1">Upload a file using the panel on the right</p>
              </div>
            ) : (
              <div ref={listRef} className="space-y-3">
                {queuedJobs.map((job) => (
                  <div key={job.jobId} className="glass-card rounded-xl p-5 card-hover flex items-center gap-4">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary-fixed text-primary">
                      <FileCode size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-on-surface truncate">{job.fileName}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs font-mono text-on-surface-variant">ID: {job.jobId}</span>
                        <span className="text-xs text-outline">·</span>
                        <span className="text-xs text-on-surface-variant">{job.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full
                                       text-primary bg-primary-fixed">
                        queued
                      </span>
                      <button
                        onClick={() => openStreamPanel(job.jobId, `File Scan — ${job.fileName}`)}
                        className="text-xs text-primary hover:underline font-semibold"
                      >
                        View Logs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — upload panel */}
          <div className="space-y-4">

            {/* Drag-and-drop upload zone */}
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Upload Source File</h3>}>

              {error && (
                <div className="mb-3 p-3 rounded-xl bg-error-container/50 border border-error/10 flex items-start gap-2">
                  <X size={13} className="text-error flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-error">{error}</p>
                </div>
              )}

              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${dragging ? 'border-primary bg-primary-fixed/30' : 'border-outline-variant/50 hover:border-primary/50'}`}
              >
                <Upload size={28} className={`mx-auto mb-3 ${dragging ? 'text-primary' : 'text-on-surface-variant'}`} />
                {pendingFile ? (
                  <>
                    <p className="text-sm font-semibold text-primary">{pendingFile.name}</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {(pendingFile.size / 1024).toFixed(1)} KB — ready to upload
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-on-surface">Drop file here</p>
                    <p className="text-xs text-on-surface-variant mt-1">or click to browse</p>
                    <p className="text-[10px] text-outline mt-2">.ts / .js / .cpp only</p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".ts,.js,.cpp"
                className="hidden"
                onChange={handleFileChange}
              />

              {pendingFile && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all
                    bg-primary-container text-on-primary-container
                    ${uploading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                >
                  {uploading ? (
                    <><Loader2 size={14} className="animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload size={14} /> Queue for Scan</>
                  )}
                </button>
              )}
            </GlassCard>

            {/* Backend info */}
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Processing Pipeline</h3>}>
              <div className="space-y-2 text-xs">
                {[
                  { icon: <FileCode size={13} />, label: 'Parser', val: 'Web Tree-Sitter WASM' },
                  { icon: <Database size={13} />, label: 'Queue', val: 'BullMQ (Redis)' },
                  { icon: <GitBranch size={13} />, label: 'AI', val: 'Gemini (Google GenAI)' },
                  { icon: <CheckCircle size={13} />, label: 'Vector DB', val: 'Pinecone (RAG)' },
                  { icon: <Clock size={13} />, label: 'Database', val: 'MongoDB (Prisma)' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-outline-variant/20 last:border-0">
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      {s.icon} {s.label}
                    </div>
                    <span className="font-semibold text-on-surface">{s.val}</span>
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
