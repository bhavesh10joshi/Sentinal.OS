import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Search, FileCode, Package, GitBranch, ArrowRight, Loader2, X } from 'lucide-react'
import { FloatingDock } from '../Components/FloatingDock'
import { StreamPanel } from '../Components/StreamPanel'
import { GlassCard } from '../Components/GlassCard'
import { WebGLShader } from '../Components/WebGLShader'
import { useAuthStore } from '../Store/useAuthStore'
import { VITE_BACKEND_URL } from '../BackendUrl/BackendUrl'
import axios from 'axios'

// Result shape returned by POST /SentinalOS/api/Analyze/search
interface SearchResult {
  chunkId: string
  score: number
  fileName: string
  rawCode: string
}

// Sentinel.OS — Semantic Architecture Search
// Connects to: POST /SentinalOS/api/Analyze/search (RAG vector search via Pinecone)
export function SemanticSearch() {
  const userId = useAuthStore((s) => s.userId) ?? 'anonymous_default_user'

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
  }, [])

  // Execute semantic search against Pinecone via backend
  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault()
    const q = overrideQuery ?? query
    if (!q.trim()) return

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      // POST /SentinalOS/api/Analyze/search — requires { prompt, userId }
      const { data } = await axios.post(`${VITE_BACKEND_URL}/SentinalOS/api/Analyze/search`, {
        prompt: q,
        userId: userId,
      })
      setResults(data.results ?? [])
    } catch (err: any) {
      setError(
        err?.response?.data?.error ??
        'Semantic search failed. The vector store may not have any indexed code for this workspace yet.'
      )
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  // Quick search from recent term pill
  const handleQuickSearch = (term: string) => {
    setQuery(term)
    handleSearch(undefined, term)
  }

  const RECENT_SEARCHES = [
    'verifySession',
    'authentication function',
    'SQL query builder',
    'rate limiter middleware',
    'crypto helper',
  ]

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <WebGLShader opacity={0.18} className="w-full h-full" />
      </div>
      <FloatingDock />
      <StreamPanel />

      <div className="relative z-10 ml-20 p-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">Semantic Architecture Search</h1>
          <p className="text-sm text-on-surface-variant mt-1">
            RAG-powered vector search over your indexed codebase — powered by Pinecone + Gemini embeddings
          </p>
          <p className="text-xs font-mono text-primary mt-1">workspace: {userId}</p>
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
                placeholder='Search your indexed codebase — e.g. "find all authentication functions" or "verifySession"'
                className="flex-1 bg-transparent text-sm text-on-surface placeholder-on-surface-variant/50 outline-none"
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setSearched(false); setResults([]) }}>
                  <X size={16} className="text-on-surface-variant hover:text-on-surface transition-colors" />
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-on-primary-container
                           text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Results panel */}
          <div className="lg:col-span-2">

            {/* Error state */}
            {error && (
              <div className="glass-card rounded-xl p-5 border border-error/20 bg-error-container/20 mb-4">
                <p className="text-sm text-error">{error}</p>
                <p className="text-xs text-on-surface-variant mt-2">
                  Note: Semantic search only works if you have previously uploaded and indexed code files
                  from the Ingestion or Playground pages.
                </p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="text-primary animate-spin" />
              </div>
            )}

            {/* Results list */}
            {!loading && searched && !error && (
              <>
                <p className="text-xs font-semibold text-on-surface-variant mb-4">
                  {results.length === 0
                    ? 'No matching code blocks found in this workspace\'s vector index.'
                    : `${results.length} semantic match${results.length !== 1 ? 'es' : ''} for "${query}"`}
                </p>

                <div className="space-y-4">
                  {results.map((r, i) => (
                    <div
                      key={r.chunkId}
                      className="glass-card rounded-xl overflow-hidden card-hover"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="px-5 py-4 flex items-start justify-between border-b border-black/5">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileCode size={14} className="text-primary flex-shrink-0" />
                          <span className="text-xs font-mono text-on-surface-variant truncate">{r.fileName}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] bg-primary-fixed text-primary px-2 py-0.5 rounded-full font-bold">
                            CHUNK
                          </span>
                          <span className="text-xs font-bold text-success">
                            {((r.score ?? 0) * 100).toFixed(1)}% match
                          </span>
                        </div>
                      </div>

                      {/* Relevance bar */}
                      <div className="px-5 pt-3">
                        <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-container rounded-full transition-all duration-700"
                            style={{ width: `${(r.score ?? 0) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Code preview */}
                      <div className="p-5">
                        <pre className="text-[11px] font-mono text-on-surface-variant leading-relaxed
                                        bg-surface-container-lowest/40 rounded-lg p-3 overflow-x-auto
                                        max-h-40 whitespace-pre-wrap">
                          {r.rawCode?.slice(0, 800)}
                          {(r.rawCode?.length ?? 0) > 800 ? '\n...(truncated)' : ''}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Initial empty state */}
            {!loading && !searched && (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-outline/30 mb-4" />
                <p className="text-on-surface-variant text-sm">Search your indexed codebase semantically</p>
                <p className="text-xs text-outline mt-2">
                  Results are pulled from your Pinecone vector index (populated via Ingestion / Playground)
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">Example Searches</h3>}>
              <div className="space-y-2">
                {RECENT_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    disabled={loading}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container transition-colors text-left disabled:opacity-50"
                  >
                    <Search size={12} className="text-on-surface-variant flex-shrink-0" />
                    <span className="text-sm font-mono text-on-surface truncate">{term}</span>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard header={<h3 className="text-sm font-bold text-on-surface">How It Works</h3>}>
              <div className="space-y-3 text-xs text-on-surface-variant">
                {[
                  { icon: <Package size={13} />, text: 'Your uploaded code is chunked into functions by Tree-Sitter' },
                  { icon: <GitBranch size={13} />, text: 'Each chunk is embedded via Gemini text-embedding-004 (768 dims)' },
                  { icon: <Search size={13} />, text: 'Query is embedded and matched against Pinecone namespace' },
                  { icon: <FileCode size={13} />, text: 'Top-K nearest chunks returned by cosine similarity' },
                ].map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-primary flex-shrink-0 mt-0.5">{s.icon}</span>
                    <span>{s.text}</span>
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
