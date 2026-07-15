import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  GitBranch, Copy, CheckCircle, ExternalLink, Webhook, Info, AlertTriangle, Link
} from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'

// Sentinel.OS — GitHub Automation Hub
// Shows webhook setup instructions using the real backend endpoint.
// The backend accepts POST /SentinalOS/api/WebHooks/github — verifies signature + queues scan.
// Note: The webhook can receive push events but cannot fetch file contents from GitHub directly yet.
// Full repo sync requires a GitHub App token (future feature).
export function GitHubHub() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'
  const [repoUrl, setRepoUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [savedRepo, setSavedRepo] = useState(() => localStorage.getItem('sentinel_github_repo') ?? '')

  const headerRef = useRef<HTMLDivElement>(null)

  const webhookEndpoint = `${VITE_BACKEND_URL}/SentinalOS/api/WebHooks/github`

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookEndpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveRepo = () => {
    if (!repoUrl.trim()) return
    localStorage.setItem('sentinel_github_repo', repoUrl.trim())
    setSavedRepo(repoUrl.trim())
    setRepoUrl('')
  }

  const handleClearRepo = () => {
    localStorage.removeItem('sentinel_github_repo')
    setSavedRepo('')
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
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">GitHub Automation Hub</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            Connect your repository to Sentinel.OS via webhook for push-event scan triggers
          </p>
          <p className="text-xs font-mono text-primary mt-1">workspace: {userId}</p>
        </div>

        {/* Current limitation notice */}
        <div className="mb-6 glass-card rounded-xl p-4 border-l-4 border-warning flex items-start gap-3">
          <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-on-surface">Webhook is a stub — full file-fetch not yet implemented</p>
            <p className="text-xs text-on-surface-variant mt-1">
              The backend can receive GitHub push events and verify the webhook signature, but cannot yet
              automatically fetch the changed file contents from GitHub (requires a GitHub App token).
              To scan code, upload files manually via <span className="text-primary font-semibold">Ingestion</span> or{' '}
              <span className="text-primary font-semibold">Playground</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — setup steps */}
          <div className="lg:col-span-2 space-y-6">

            {/* Step 1 — Register your repo */}
            <GlassCard header={
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-fixed text-primary text-xs font-bold">1</span>
                <h3 className="text-sm font-bold text-on-surface">Register Your Repository</h3>
              </div>
            }>
              <p className="text-xs text-on-surface-variant mb-4">
                Enter your GitHub repo URL. This is stored locally for reference — it identifies which
                repo push events belong to you.
              </p>

              {savedRepo ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-success-container/30 border border-success/20">
                  <CheckCircle size={15} className="text-success flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-on-surface-variant">Connected repository</p>
                    <p className="text-sm font-mono font-semibold text-on-surface truncate">{savedRepo}</p>
                  </div>
                  <button
                    onClick={handleClearRepo}
                    className="text-xs text-error hover:underline font-semibold flex-shrink-0"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Link size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveRepo()}
                      placeholder="https://github.com/your-org/your-repo"
                      className="w-full pl-9 pr-4 py-2.5 bg-surface-container/60 rounded-xl text-sm text-on-surface
                                 placeholder-on-surface-variant/50 outline-none border border-outline-variant/30
                                 focus:border-primary/40 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleSaveRepo}
                    disabled={!repoUrl.trim()}
                    className="px-4 py-2.5 bg-primary-container text-on-primary-container text-sm font-semibold
                               rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              )}
            </GlassCard>

            {/* Step 2 — Configure webhook */}
            <GlassCard header={
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-fixed text-primary text-xs font-bold">2</span>
                <h3 className="text-sm font-bold text-on-surface">Configure GitHub Webhook</h3>
              </div>
            }>
              <p className="text-xs text-on-surface-variant mb-4">
                Go to your repository on GitHub → Settings → Webhooks → Add webhook.
                Use the endpoint below and set Content type to <code className="bg-surface-container px-1 rounded text-[11px]">application/json</code>.
              </p>

              {/* Webhook URL copy box */}
              <div className="mb-4">
                <label className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5 block">
                  Payload URL
                </label>
                <div className="flex items-center gap-2 p-3 bg-on-surface/5 rounded-xl border border-outline-variant/30 font-mono">
                  <Webhook size={14} className="text-primary flex-shrink-0" />
                  <span className="flex-1 text-xs text-on-surface truncate">{webhookEndpoint}</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-container transition-colors flex-shrink-0"
                  >
                    {copied ? <CheckCircle size={13} className="text-success" /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Settings guide */}
              <div className="space-y-2 text-xs">
                {[
                  { field: 'Content type', value: 'application/json' },
                  { field: 'Secret', value: 'Set GITHUB_WEBHOOK_SECRET in your backend .env' },
                  { field: 'Events', value: 'Just the push event' },
                  { field: 'Active', value: 'Yes (check the box)' },
                ].map((item) => (
                  <div key={item.field} className="flex items-start gap-3 py-2 border-b border-outline-variant/20 last:border-0">
                    <span className="text-on-surface-variant w-28 flex-shrink-0">{item.field}</span>
                    <span className="font-semibold text-on-surface">{item.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <ExternalLink size={12} />
                GitHub Webhook Documentation
              </a>
            </GlassCard>

            {/* Step 3 — What happens */}
            <GlassCard header={
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-fixed text-primary text-xs font-bold">3</span>
                <h3 className="text-sm font-bold text-on-surface">What Happens on Push</h3>
              </div>
            }>
              <div className="space-y-3">
                {[
                  { step: 'GitHub sends a POST to the webhook endpoint', done: true },
                  { step: 'Backend verifies HMAC-SHA256 webhook signature', done: true },
                  { step: 'Push event payload is logged to the queue', done: true },
                  { step: 'Backend fetches changed file contents via GitHub API (not yet — requires GitHub App token)', done: false },
                  { step: 'Files are queued for AST scan via BullMQ', done: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {s.done
                      ? <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                      : <div className="w-3.5 h-3.5 rounded-full border-2 border-outline-variant flex-shrink-0 mt-0.5" />
                    }
                    <p className={`text-xs ${s.done ? 'text-on-surface' : 'text-on-surface-variant'}`}>{s.step}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Connection Status</h3>}>
              <div className="text-center py-4">
                <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  savedRepo ? 'bg-success-container' : 'bg-surface-container'
                }`}>
                  <GitBranch size={24} className={savedRepo ? 'text-success' : 'text-on-surface-variant'} />
                </div>
                <p className="text-sm font-bold text-on-surface mb-1">
                  {savedRepo ? 'Repository Saved' : 'No repository linked'}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {savedRepo
                    ? 'Configure the webhook in your repo settings to receive push events'
                    : 'Enter your GitHub repository URL in Step 1 to get started'
                  }
                </p>
              </div>
            </GlassCard>

            <GlassCard header={
              <div className="flex items-center gap-1.5">
                <Info size={13} className="text-primary" />
                <h3 className="text-sm font-bold text-on-surface">Manual Scanning</h3>
              </div>
            }>
              <p className="text-xs text-on-surface-variant mb-4">
                While automatic push scanning is being developed, scan your code manually:
              </p>
              <div className="space-y-2">
                <a href="/Sentinel/Ingestion" className="flex items-center gap-2 p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container transition-colors">
                  <span className="text-xs font-semibold text-primary">Upload File</span>
                  <span className="text-xs text-on-surface-variant">→ Ingestion page</span>
                </a>
                <a href="/Sentinel/Playground" className="flex items-center gap-2 p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container transition-colors">
                  <span className="text-xs font-semibold text-primary">Paste Code</span>
                  <span className="text-xs text-on-surface-variant">→ Playground page</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
