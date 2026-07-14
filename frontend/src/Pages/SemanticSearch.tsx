import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Search, FileCode, Package, GitBranch, ArrowRight } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'

const SEARCH_RESULTS = [
  { file: '/src/auth/JWTHandler.ts',      match: 'verifySession()', line: 142, type: 'function', relevance: 98 },
  { file: '/src/middleware/AuthGuard.ts', match: 'verifySession()',  line: 28,  type: 'call',     relevance: 95 },
  { file: '/src/tests/auth.spec.ts',      match: 'verifySession()', line: 64,  type: 'test',     relevance: 88 },
  { file: '/src/types/session.d.ts',      match: 'SessionPayload',  line: 5,   type: 'interface',relevance: 72 },
]

const RECENT = ['verifySession', 'atomicSessionLookup', 'RateLimiter', 'RBAC', 'CryptoHelper']

// Sentinel.OS — Semantic Architecture Search
export function SemanticSearch() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) setSearched(true)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><WebGLShader opacity={0.18} className="w-full h-full" /></div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Semantic Architecture Search</h1>
          <p className="text-sm text-on-surface-variant mt-1">Query your entire codebase with natural language or symbols</p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative glass-panel rounded-2xl overflow-hidden border border-white/30 shadow-glass-lg">
            <div className="flex items-center px-5 py-4 gap-4">
              <Search size={20} className="text-primary flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search by function name, pattern, or natural language — "find all auth functions that use JWT"'
                className="flex-1 bg-transparent text-sm text-on-surface placeholder-on-surface-variant/50 outline-none font-mono"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container
                           text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                Search <ArrowRight size={14} />
              </button>
            </div>

            {/* Search type pills */}
            <div className="px-5 pb-4 flex gap-2">
              {['Semantic', 'Regex', 'Symbol', 'Type', 'Dependency'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    mode === 'Semantic' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Results */}
          <div className="lg:col-span-2">
            {searched ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-on-surface-variant mb-4">
                  {SEARCH_RESULTS.length} results for "<span className="text-primary">{query || 'verifySession'}</span>"
                </p>
                {SEARCH_RESULTS.map((r) => (
                  <div key={`${r.file}-${r.line}`} className="glass-card rounded-xl p-5 card-hover">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileCode size={14} className="text-primary flex-shrink-0" />
                        <span className="text-xs font-mono text-on-surface-variant truncate">{r.file}:{r.line}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-bold uppercase">{r.type}</span>
                        <span className="text-xs font-bold text-success">{r.relevance}%</span>
                      </div>
                    </div>
                    <p className="text-sm font-mono font-bold text-on-surface">{r.match}</p>
                    <div className="mt-3 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full" style={{ width: `${r.relevance}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-outline/40 mb-4" />
                <p className="text-on-surface-variant text-sm">Search your entire codebase semantically</p>
                <p className="text-xs text-outline mt-2">Try: "functions that handle authentication" or "verifySession"</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Recent Searches</h3>}>
              <div className="space-y-2">
                {RECENT.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); setSearched(true) }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors text-left"
                  >
                    <Search size={13} className="text-on-surface-variant" />
                    <span className="text-sm font-mono text-on-surface">{term}</span>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Codebase Index</h3>}>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Total Symbols', value: '14,392', icon: <Package size={13} /> },
                  { label: 'Functions',     value: '3,847',  icon: <FileCode size={13} /> },
                  { label: 'Branches',      value: '7',      icon: <GitBranch size={13} /> },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-outline-variant/20 last:border-0">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      {s.icon} {s.label}
                    </div>
                    <span className="font-bold text-on-surface">{s.value}</span>
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
