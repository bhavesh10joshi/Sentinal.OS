import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Play, Square, Terminal, RefreshCw, Trash2, Upload, ChevronDown, Loader2 } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

const PLAYBOOKS = [
  'Auth Module Deep Dive',
  'Full Repository Scan',
  'Dependency Vulnerability Audit',
  'OWASP Top 10 Scan',
  'Custom Code Snippet',
]

// Default code snippet shown in the editor panel
const DEFAULT_CODE = `// Paste your TypeScript / JavaScript / C++ code here
// Sentinel.OS will parse it into AST blocks and analyze each function

async function verifySession(sessionId: string) {
  const session = await getCache(sessionId);
  if (!session) throw new Error("Session not found");
  
  // Potential TOCTOU: session may expire between check and use
  const user = await db.users.findById(session.userId);
  return user;
}

function buildQuery(userId: string) {
  // SQL injection risk — raw string interpolation
  return db.query(\`SELECT * FROM users WHERE id=\${userId}\`);
}
`

// Sentinel.OS — Playground Workspace
// Connects to: POST /SentinalOS/api/Analyze/raw (raw code snippet)
//              POST /SentinalOS/api/Analyze/file (file upload)
export function Playground() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'
  const openStreamPanel = useAuthStore((s) => s.openStreamPanel)

  const [code, setCode] = useState(DEFAULT_CODE)
  const [playbook, setPlaybook] = useState('Auth Module Deep Dive')
  const [dropOpen, setDropOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [mode, setMode] = useState<'raw' | 'file'>('raw')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [lastJobId, setLastJobId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const headerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [])

  // Submit raw code snippet to POST /SentinalOS/api/Analyze/raw
  const handleRawSubmit = async () => {
    if (!code.trim()) {
      setError('Please paste some code to analyze.')
      return
    }
    setError('')
    setSuccessMsg('')
    setSubmitting(true)

    try {
      const { data } = await axios.post(`${VITE_BACKEND_URL}/SentinalOS/api/Analyze/raw`, {
        RawCode: code,
        userId: userId,
      })

      setLastJobId(data.jobId)
      setSuccessMsg(`Queued successfully — Job ID: ${data.jobId}`)
      // Open the stream panel to show live progress
      openStreamPanel(data.jobId, `Raw Scan — ${playbook}`)
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Failed to submit code. Is the backend running?')
    } finally {
      setSubmitting(false)
    }
  }

  // Upload a code file to POST /SentinalOS/api/Analyze/file
  const handleFileSubmit = async () => {
    if (!selectedFile) {
      setError('Please select a .ts / .js / .cpp file to upload.')
      return
    }
    setError('')
    setSuccessMsg('')
    setSubmitting(true)

    try {
      const formData = new FormData()
      // Backend looks for the field name "codeFile"
      formData.append('codeFile', selectedFile)
      formData.append('userId', userId)

      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/SentinalOS/api/Analyze/file`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      setLastJobId(data.jobId)
      setSuccessMsg(`File queued — Job ID: ${data.jobId}`)
      openStreamPanel(data.jobId, `File Scan — ${selectedFile.name}`)
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Failed to upload file. Only .ts/.js/.cpp files are accepted.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file) {
      const allowed = ['.ts', '.js', '.cpp']
      const valid = allowed.some((ext) => file.name.endsWith(ext))
      if (!valid) {
        setError('Only .ts, .js, and .cpp files are supported.')
        setSelectedFile(null)
        return
      }
      setSelectedFile(file)
      setError('')
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
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Playground Workspace</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Paste raw code or upload a file — Sentinel.OS agents will parse and analyze every function
          </p>
          <p className="text-xs font-mono text-primary mt-1">workspace: {userId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Config panel */}
          <div className="lg:col-span-1 space-y-4">
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Configuration</h3>}>

              {/* Mode toggle */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Input Mode
                </label>
                <div className="flex gap-2">
                  {(['raw', 'file'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        mode === m
                          ? 'bg-primary-container text-on-primary-container'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {m === 'raw' ? 'Raw Code' : 'File Upload'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playbook selector */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Playbook
                </label>
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(!dropOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-surface-container/60 rounded-xl text-sm font-medium text-on-surface"
                  >
                    {playbook}
                    <ChevronDown size={15} className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-xl overflow-hidden z-20 shadow-glass-lg">
                      {PLAYBOOKS.map((p) => (
                        <button
                          key={p}
                          onClick={() => { setPlaybook(p); setDropOpen(false) }}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-surface-container transition-colors text-on-surface"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* File upload zone — only shown in file mode */}
              {mode === 'file' && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                    Source File (.ts / .js / .cpp)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-outline-variant/50 hover:border-primary/50 rounded-xl p-5 text-center cursor-pointer transition-all"
                  >
                    <Upload size={22} className="mx-auto text-on-surface-variant mb-2" />
                    {selectedFile ? (
                      <p className="text-xs font-semibold text-primary">{selectedFile.name}</p>
                    ) : (
                      <p className="text-xs text-on-surface-variant">Click to select file</p>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".ts,.js,.cpp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {/* Error / success feedback */}
              {error && (
                <div className="mb-3 p-3 rounded-xl bg-error-container/50 border border-error/10">
                  <p className="text-xs text-error">{error}</p>
                </div>
              )}
              {successMsg && (
                <div className="mb-3 p-3 rounded-xl bg-success-container/50 border border-success/10">
                  <p className="text-xs text-success font-mono">{successMsg}</p>
                </div>
              )}

              {/* Run button */}
              <div className="flex gap-2">
                <button
                  onClick={mode === 'raw' ? handleRawSubmit : handleFileSubmit}
                  disabled={submitting}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all
                    ${submitting ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                    bg-primary-container text-on-primary-container`}
                >
                  {submitting ? (
                    <><Loader2 size={14} className="animate-spin" /> Queuing...</>
                  ) : (
                    <><Play size={14} /> Run Scan</>
                  )}
                </button>
                <button
                  onClick={() => { setCode(DEFAULT_CODE); setSelectedFile(null); setError(''); setSuccessMsg('') }}
                  className="w-12 flex items-center justify-center glass-card rounded-xl hover:bg-white/80 transition-all"
                  title="Reset"
                >
                  <Trash2 size={15} className="text-on-surface-variant" />
                </button>
              </div>

              {/* Last job reference */}
              {lastJobId && (
                <div className="mt-3 p-3 rounded-xl bg-surface-container/40 text-center">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Last Job</p>
                  <p className="text-[11px] font-mono text-primary break-all">{lastJobId}</p>
                </div>
              )}
            </GlassCard>

            {/* Environment info */}
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Environment</h3>}>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'Runtime',   val: 'Node 22 / WASM' },
                  { key: 'Parser',    val: 'Web Tree-Sitter' },
                  { key: 'AI Model',  val: 'Gemini (Google AI)' },
                  { key: 'Queue',     val: 'BullMQ + Redis' },
                  { key: 'Vector DB', val: 'Pinecone' },
                  { key: 'Timeout',   val: 'Queue-managed' },
                ].map((e) => (
                  <div key={e.key} className="flex justify-between py-1.5 border-b border-outline-variant/20 last:border-0">
                    <span className="text-on-surface-variant">{e.key}</span>
                    <span className="font-mono font-semibold text-on-surface">{e.val}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Code editor panel (raw mode) */}
          <div className="lg:col-span-2">
            {mode === 'raw' ? (
              <div className="glass-card rounded-xl overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
                {/* Editor chrome */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-surface-container-highest/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-error/50" />
                    <div className="w-3 h-3 rounded-full bg-warning-container" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-on-surface-variant" />
                    <span className="text-xs font-mono text-on-surface-variant">code-editor.ts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {submitting && <RefreshCw size={13} className="text-primary animate-spin" />}
                    <span className="text-[10px] text-on-surface-variant">{code.split('\n').length} lines</span>
                  </div>
                </div>

                {/* Editable code area */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 p-5 font-mono text-[13px] leading-relaxed bg-surface-container-lowest/30
                             text-on-surface resize-none outline-none placeholder-on-surface-variant/30"
                  spellCheck={false}
                  placeholder="Paste your TypeScript / JavaScript / C++ code here..."
                />
              </div>
            ) : (
              /* File upload info panel */
              <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: '600px' }}>
                <Upload size={56} className="text-primary/30 mb-6" />
                <h3 className="text-lg font-bold text-on-surface mb-3">File Upload Mode</h3>
                <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed mb-6">
                  Select a <span className="text-primary font-mono">.ts</span>,{' '}
                  <span className="text-primary font-mono">.js</span>, or{' '}
                  <span className="text-primary font-mono">.cpp</span> file from the config panel.
                  The file is sent as multipart/form-data to the backend for AST parsing and AI review.
                </p>
                {selectedFile && (
                  <div className="glass-card rounded-xl px-6 py-4 text-left w-full max-w-xs">
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Selected File</p>
                    <p className="text-sm font-mono font-bold text-primary">{selectedFile.name}</p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
