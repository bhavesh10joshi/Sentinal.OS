# Sentinel.OS — AI-Powered Code Security Scanner

> A single-pipeline, queue-based security analysis tool that uses Tree-Sitter AST parsing and Gemini AI to find vulnerabilities in TypeScript, JavaScript, and C++ code.

---

## Background

I was working on a TypeScript microservices project and kept finding security issues that ESLint and similar linters missed — TOCTOU patterns, SQL injection via string interpolation, weak session handling. Linters reason at the token level; they don't understand program flow. I wanted something that could look at individual function bodies, parse them structurally, and send them to an LLM for semantic analysis with a structured remediation output.

This is Sentinel.OS. It is not comparable to Semgrep or CodeQL — those have years of rule development and measurable precision/recall benchmarks. Sentinel.OS is a prototype of an LLM-as-judge approach, without a rule layer or evaluation dataset behind it. Treat its output as a starting point for review, not as ground truth.

---

## What It Does

1. **AST-level code parsing** — Web Tree-Sitter (WASM) parses uploaded TypeScript, JavaScript, or C++ files into individual function blocks
2. **LLM security review** — Each function block is sent to Gemini AI with a structured prompt asking for vulnerability classification, severity, summary, and remediation code
3. **Asynchronous job queue** — BullMQ/Redis handles the scan pipeline so the API returns immediately with a job ID
4. **Semantic code search** — Scanned code chunks are embedded via Gemini `text-embedding-004` and stored in Pinecone for natural-language queries
5. **GitHub webhook receiver** — The backend accepts push event payloads and verifies the HMAC signature, but cannot yet fetch file contents from GitHub (requires a GitHub App token — not implemented)
6. **Scan history** — Reports, findings, and severity ratings are persisted to MongoDB via Prisma ORM

### What It Does Not Do

- There is no traditional rule-based detection layer (no Semgrep-style patterns). All detection is LLM-based, which means false positives and false negatives occur.
- There is no user authentication. Anyone who knows a userId string can read that workspace's history. This is not isolation — it is a namespace label.
- The GitHub webhook cannot automatically fetch and scan pushed code yet. File contents must be uploaded manually via Ingestion or Playground.
- There are no benchmarked precision/recall numbers. The tool has not been evaluated against a labeled vulnerability dataset.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | Component framework |
| Vite 6 | Build tool and dev server |
| Tailwind CSS 3 | Utility-first styling with CSS variable tokens |
| Three.js | Neural network particle background |
| GSAP | Entrance and micro-animations |
| Zustand | Client state (userId identity, stream panel, theme) |
| Axios | HTTP API client |
| React Router DOM v6 | Client-side routing with ProtectedRoute guards |
| Lucide React | Icon set |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + TypeScript | Runtime |
| Express 5 | HTTP server |
| Prisma ORM | Database access layer |
| MongoDB Atlas | Scan report persistence |
| BullMQ | Async job queue |
| Redis / Upstash | BullMQ backend |
| Web Tree-Sitter (WASM) | AST parsing |
| Google Generative AI (Gemini) | LLM security analysis + text embeddings |
| Pinecone | Vector database for semantic search |
| Multer | File upload middleware |

---

## Architecture

```
User / GitHub Webhook
        │
        ▼
 Express API Server (Node.js)
        │
        │  POST /raw  →  { RawCode, userId }
        │  POST /file →  multipart/form-data { codeFile, userId }
        │  GET  /history?userId=xxx
        │  POST /search  →  { prompt, userId }
        │  GET  /status/:jobId
        │
        │  Validates input → pushes job to BullMQ
        │
        ▼
 BullMQ CodeScanQueue (Redis)
        │
        │  Background worker picks up job:
        │
        ▼
 ┌──────────────────────────────────┐
 │  Scan Worker (sequential steps) │
 │  1. Tree-Sitter WASM             │
 │     parse code → function blocks │
 │  2. Pinecone upsert              │
 │     embed + store blocks         │
 │  3. Gemini AI per block          │
 │     → { severity, summary,       │
 │          remediationCode }        │
 │  4. Prisma → MongoDB             │
 │     persist ScanReport           │
 └──────────────────────────────────┘
        │
        ▼
 MongoDB: ScanReport, Vulnerability[], TelemetryLog[]
 Pinecone: code chunk embeddings (768 dims)

 Frontend polls GET /status/:jobId every 2.5s
 → shows WAITING → ACTIVE → COMPLETED in StreamPanel
```

Note: this is a sequential pipeline, not concurrent multi-agent execution. Steps run one after another within a single BullMQ worker.

---

## API Reference

| Method | Endpoint | Body / Params | Description |
|---|---|---|---|
| `POST` | `/SentinalOS/api/Analyze/raw` | `{ RawCode, userId }` | Submit raw code string |
| `POST` | `/SentinalOS/api/Analyze/file` | multipart: `codeFile`, `userId` | Upload `.ts/.js/.cpp` file |
| `GET` | `/SentinalOS/api/Analyze/status/:jobId` | — | Poll job status |
| `GET` | `/SentinalOS/api/Analyze/history` | `?userId=xxx` | All scan reports for workspace |
| `POST` | `/SentinalOS/api/Analyze/search` | `{ prompt, userId }` | Semantic search (Pinecone) |
| `POST` | `/SentinalOS/api/WebHooks/github` | GitHub push payload | Webhook receiver (stub) |

---

## Workflow

```
1. User sets a workspace ID on the Login page (stored in localStorage)
2. User pastes code (Playground) or uploads a .ts/.js/.cpp file (Ingestion)
3. Frontend POSTs to /raw or /file → backend returns { jobId }
4. StreamPanel opens, polls /status/:jobId every 2.5 seconds
5. Worker: Tree-Sitter parses → Pinecone upserts → Gemini reviews each block
6. COMPLETED → findings shown in StreamPanel
7. Diagnostics page loads full history via GET /history?userId=xxx
8. SemanticSearch queries Pinecone via POST /search
```

---

## Folder Structure

```
Sentinal.OS/
├── backend/
│   ├── src/
│   │   ├── Routers/
│   │   │   ├── Analyze.ts        — Scan, history, search, status routes
│   │   │   └── WebHooks.ts       — GitHub webhook receiver (stub)
│   │   ├── Queues/
│   │   │   └── scanQueue.ts      — BullMQ queue definition
│   │   ├── workers/
│   │   │   └── scanWorker.ts     — Sequential scan pipeline
│   │   ├── Functions/
│   │   │   └── RunParser.ts      — Tree-Sitter AST parser
│   │   ├── GeminiAISDK/
│   │   │   └── AIParsing.ts      — Gemini structured JSON analysis
│   │   ├── Utils/
│   │   │   ├── VectorStore.ts    — Pinecone upsert
│   │   │   └── VectorQuery.ts    — Pinecone query
│   │   ├── Db/Db.ts              — Prisma client
│   │   ├── Config/redis.ts       — Redis connection
│   │   └── index.ts              — Express entry point
│   └── prisma/schema.prisma      — MongoDB schema
│
└── frontend/
    ├── src/
    │   ├── App.tsx               — Routes + ProtectedRoute
    │   ├── index.css             — CSS variable design tokens, dark/light mode
    │   ├── BackendUrl/           — Backend URL injection (env-aware)
    │   ├── Store/
    │   │   ├── useAuthStore.ts   — userId identity + stream panel state
    │   │   └── useThemeStore.ts  — Dark/light mode toggle
    │   ├── Components/
    │   │   ├── FloatingDock.tsx  — Sidebar nav with theme toggle
    │   │   ├── StreamPanel.tsx   — Job status poll panel
    │   │   ├── ThemeToggle.tsx   — Sun/moon toggle button
    │   │   └── ...               — Other shared components
    │   └── Pages/
    │       ├── LandingPage.tsx   — Public marketing page
    │       ├── LogIn.tsx         — Workspace identity setup
    │       ├── Dashboard.tsx     — Real KPIs from scan history
    │       ├── Ingestion.tsx     — File upload → POST /file
    │       ├── Diagnostics.tsx   — Scan history + vulnerability details
    │       ├── GitHubHub.tsx     — Webhook setup guide
    │       ├── SemanticSearch.tsx— RAG search → POST /search
    │       ├── Playground.tsx    — Code editor → POST /raw or /file
    │       └── Analytics.tsx     — Charts derived from GET /history
    ├── .env                      — VITE_BACKEND_URL (not committed)
    ├── .env.example
    ├── tailwind.config.cjs
    └── vite.config.ts
```

---

## Deployment (Vercel)

### Prerequisites

- MongoDB Atlas cluster (free tier)
- Pinecone index: 768 dimensions, cosine metric
- Redis instance (Upstash free tier works)
- Google AI Studio API key

### Backend

1. Import `backend/` into Vercel (Framework: Other)
2. Set build command: `npm run build`, output: `dist`
3. Add environment variables:

```env
GOOGLE_SDK_API_CREDENTIALS=your_google_ai_key
GEMINI_API_KEY=your_google_ai_key
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/SentinalOS
REDIS_URL=rediss://default:pass@your-upstash-host:port
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=sentinel-os
FRONTEND_URL=https://your-frontend.vercel.app
```

> **BullMQ workers need a persistent process.** Vercel serverless functions time out at ~10 seconds. Run `scanWorker.ts` on a separate always-on process (Railway, Render, or a VPS). The Express API itself can stay on Vercel.

### Frontend

1. Import `frontend/` into Vercel (Framework: Vite)
2. Add env variable: `VITE_BACKEND_URL=https://your-backend.vercel.app`
3. Update `src/BackendUrl/BackendUrl.tsx` with the deployed URL
4. Deploy

---

## Running Locally

```bash
git clone https://github.com/yourusername/Sentinal.OS.git

# Backend
cd backend
npm install
cp .env.example .env       # fill in your credentials
npx prisma generate
docker run -d -p 6379:6379 redis:7
npm run dev                # http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
echo "VITE_BACKEND_URL=http://localhost:5000" > .env
npm run dev                # http://localhost:5173
```

First use: open `http://localhost:5173` → Login page → enter a display name and workspace ID → Playground → paste code → Run Scan.

---

## Services Used

| Service | Free Tier | Purpose |
|---|---|---|
| MongoDB Atlas | 512 MB | Scan reports + vulnerability data |
| Pinecone | 1 index, 100K vectors | Code chunk embeddings |
| Redis (Upstash) | 10K commands/day | BullMQ queue |
| Google AI Studio | 60 req/min | Gemini analysis + embeddings |
| Vercel | Hobby tier | Frontend + API deployment |
| GitHub Webhooks | Free | Push event receiver |

---

## Future Modifications

- [ ] **User Authentication** — Add JWT-based auth (Clerk or custom) so teams can have private workspaces
- [ ] **Live WebSocket Streaming** — Replace polling with WebSocket push for instant job log delivery
- [ ] **GitHub App Integration** — Full GitHub App (vs raw webhooks) — fetch actual file contents from push events via GitHub API
- [ ] **Multi-language Support** — Extend Tree-Sitter parsers to Python, Rust, Go, Java
- [ ] **PR Auto-comment Bot** — Sentinel.OS posts a GitHub comment on PRs with vulnerability findings
- [ ] **Scheduled Scans** — Cron-based nightly full-repository sweeps
- [ ] **Team Dashboard** — Aggregate metrics across multiple workspace IDs for engineering manager view
- [ ] **SARIF Export** — Export findings in SARIF format (compatible with GitHub Code Scanning tab)
- [ ] **Custom Playbooks** — User-defined scanning rules beyond the default OWASP analysis
- [ ] **Historical Trend Charts** — D3/Recharts graphs showing vulnerability trends over time per workspace

---

## Screenshots

> Screenshots are auto-generated from the live app. Run locally to explore all views.

**Landing Page** — Glassmorphism hero with live terminal mockup and compliance trust badges

**Central Command Dashboard** — Real-time KPIs, agent fleet status, security overview, and live activity feed

**Playground Workspace** — Code editor with raw/file scan modes, live stream panel with job polling

**Diagnostics** — Accordion scan history with per-function vulnerability cards and AI remediation code

**Semantic Search** — Natural language RAG queries over Pinecone-indexed code

---

## License

MIT — Built by Josh Bartholomew

---

*Sentinel.OS was built out of a real need — not as a demo. Every component is wired to a real backend, processes real code, and returns real AI-generated security insights.*
