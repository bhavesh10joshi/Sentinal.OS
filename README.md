# Sentinel.OS — Autonomous AI Code Review Platform

> **Production-grade, multi-agent security orchestration engine for TypeScript / JavaScript / C++ repositories**

---

## Why I Built This

I was working on a fast-moving TypeScript microservices project and kept seeing critical security issues slip into production — TOCTOU race conditions, SQL injection patterns, JWT verification bypasses — things that traditional regex-based linters like ESLint completely miss because they don't understand program logic.

Manual security audits happened weekly at best. By the time a PR was reviewed and a vulnerability found, the code was often already merged or deployed. I needed something that could run instantly on every commit, understand code at the Abstract Syntax Tree level, and generate actionable remediation patches — not just vague warnings.

That's what Sentinel.OS is. It combines Tree-Sitter AST parsing, BullMQ asynchronous job processing, Gemini AI structured security analysis, and Pinecone vector embeddings into a single platform with a professional real-time dashboard.

---

## What It Does

Sentinel.OS provides:

1. **AST-Level Security Scanning** — Parses your code via Web Tree-Sitter (WASM) into function-level blocks, then sends each block to Gemini AI for deep semantic vulnerability analysis
2. **Multi-Agent Orchestration** — SecurityGuard (vulnerability detection), ASTParser (syntax tree analysis), and VectorStore (semantic embedding) agents run concurrently via BullMQ queues
3. **GitHub Webhook Integration** — Automatically triggers scans on every `git push` event; no manual invocation required
4. **Semantic Code Search (RAG)** — All scanned code is embedded into Pinecone using Gemini `text-embedding-004`; you can query your entire indexed codebase in natural language
5. **Real-time Job Streaming** — Live poll-based stream panel shows job state transitions (WAITING → ACTIVE → COMPLETED), per-function findings, severity breakdowns, and AI remediation code
6. **Persistent Scan History** — Every scan report, vulnerability finding, and telemetry log is persisted to MongoDB via Prisma ORM — accessible via the Diagnostics page

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19 + TypeScript** | Component framework |
| **Vite 6** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **Three.js** | Neural network particle background |
| **GSAP** | Entrance and micro-animations |
| **Zustand** | Client state management (userId, stream panel) |
| **Zod** | Input validation schemas |
| **Axios** | HTTP client for backend API calls |
| **React Router DOM v6** | Client-side routing with protected routes |
| **Lucide React** | Icon set |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + TypeScript** | Runtime |
| **Express 5** | HTTP server |
| **Prisma ORM** | Database access layer |
| **MongoDB Atlas** | Persistent scan report storage |
| **BullMQ** | Async job queue (scan pipeline) |
| **Redis** | BullMQ queue backend |
| **Web Tree-Sitter (WASM)** | AST parsing for TS/JS/C++ |
| **Google Generative AI** | Gemini structured JSON security analysis |
| **Pinecone** | Vector database for semantic code embeddings |
| **Multer** | Multipart file upload handling |
| **Helmet + express-rate-limit** | Security middleware |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      SENTINEL.OS ARCHITECTURE                   │
└─────────────────────────────────────────────────────────────────┘

  USER / GITHUB WEBHOOK
         │
         ▼
  ┌──────────────┐    POST /raw           ┌─────────────────────┐
  │   Frontend   │───────────────────────►│  Express API Server  │
  │  (React/TS)  │    POST /file          │   (Node.js Port 5000)│
  │  Vercel CDN  │    GET  /status/:id    └──────────┬──────────┘
  └──────────────┘    GET  /history                  │
         ▲            POST /search                   │ enqueue job
         │                                           ▼
         │                                  ┌────────────────────┐
         │                                  │  BullMQ Queue      │
         │                                  │  (Redis / Upstash) │
         │                                  └─────────┬──────────┘
         │                                            │ worker picks up
         │                                            ▼
         │                               ┌────────────────────────┐
         │                               │     Scan Worker        │
         │                               │  1. runParser()        │
         │                               │     Web Tree-Sitter    │
         │                               │     → AST function     │
         │                               │       blocks           │
         │                               │  2. upsertVector()     │
         │                               │     → Pinecone upsert  │
         │                               │  3. GenerateResponse() │
         │                               │     → Gemini AI JSON   │
         │                               │  4. prisma.create()    │
         │                               │     → MongoDB persist  │
         │                               └────────────────────────┘
         │                                    │          │
         │                            ┌───────┘          └──────────┐
         │                            ▼                             ▼
         │                   ┌────────────────┐           ┌─────────────────┐
         │                   │  MongoDB Atlas │           │  Pinecone Vector │
         │                   │  ScanReport    │           │  DB (768 dims)   │
         │                   │  Vulnerability │           │  text-embedding  │
         │                   │  TelemetryLog  │           │  -004 model      │
         │                   └────────────────┘           └─────────────────┘
         │
  ┌──────┴────────────────────────────────────┐
  │  Frontend Poll: GET /status/:jobId (2.5s) │
  │  → Shows WAITING → ACTIVE → COMPLETED     │
  │  → Renders findings in StreamPanel        │
  └───────────────────────────────────────────┘
```

---

## Workflow

```
1. Developer pastes code (Playground) or uploads .ts/.js/.cpp (Ingestion)
         │
2. Frontend POSTs to /SentinalOS/api/Analyze/raw or /file
         │
3. Backend validates → pushes job to BullMQ CodeScanQueue
         │
4. Returns { jobId } immediately — non-blocking
         │
5. Frontend opens StreamPanel, polls /status/:jobId every 2.5 seconds
         │
6. Worker (background) picks up job:
   a. Web Tree-Sitter parses code → function-level blocks []
   b. Each block → Gemini AI: returns { vulnerabilityFound, severity, issueSummary, remediationCode }
   c. All blocks → Pinecone: upserted as embeddings in user namespace
   d. Full report → MongoDB: ScanReport + Vulnerability[] + TelemetryLog[]
         │
7. StreamPanel shows COMPLETED + findings summary
         │
8. Diagnostics page loads full history via GET /history
         │
9. SemanticSearch queries Pinecone via POST /search { prompt, userId }
```

---

## API Reference

All endpoints require a `userId` for namespace isolation.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/SentinalOS/api/Analyze/raw` | Submit raw code string for AST scan |
| `POST` | `/SentinalOS/api/Analyze/file` | Upload `.ts/.js/.cpp` file (multipart/form-data) |
| `GET` | `/SentinalOS/api/Analyze/status/:jobId` | Poll scan job status and result |
| `GET` | `/SentinalOS/api/Analyze/history` | Fetch all scan reports for a userId |
| `POST` | `/SentinalOS/api/Analyze/search` | Semantic RAG code search (Pinecone) |
| `POST` | `/SentinalOS/api/WebHooks/github` | GitHub push webhook receiver |

---

## Use Cases

- **Solo Developer Security Audits** — paste code snippets, get instant AI-powered vulnerability reports with remediation patches
- **Team PR Pre-flight Checks** — connect GitHub webhook to auto-scan every push before review
- **Legacy Codebase Onboarding** — upload old files to build a semantic index, then query it in natural language ("find all database query functions")
- **Compliance Verification** — Diagnostics page shows severity breakdowns (CRITICAL / HIGH / MEDIUM / LOW) for audit trails
- **Security Training** — use the Playground to study how different code patterns are analyzed at the AST level

---

## Folder Structure

```
Sentinal.OS/
├── backend/
│   ├── src/
│   │   ├── Routers/
│   │   │   ├── Analyze.ts          — Main scan + search + history API routes
│   │   │   └── WebHooks.ts         — GitHub webhook receiver
│   │   ├── Queues/
│   │   │   └── scanQueue.ts        — BullMQ CodeScanQueue definition
│   │   ├── workers/
│   │   │   └── scanWorker.ts       — Background scan pipeline
│   │   ├── Functions/
│   │   │   └── RunParser.ts        — Web Tree-Sitter AST parser
│   │   ├── GeminiAISDK/
│   │   │   └── AIParsing.ts        — Gemini structured JSON analysis
│   │   ├── Utils/
│   │   │   ├── VectorStore.ts      — Pinecone upsert (embed + store)
│   │   │   └── VectorQuery.ts      — Pinecone query (semantic search)
│   │   ├── Db/
│   │   │   └── Db.ts               — Prisma client singleton
│   │   ├── Config/
│   │   │   └── redis.ts            — Redis connection config
│   │   ├── StatusCodes/
│   │   │   └── StatusCodes.ts      — HTTP status code constants
│   │   └── index.ts                — Express app entry point
│   ├── prisma/
│   │   └── schema.prisma           — MongoDB schema (ScanReport, Vulnerability, TelemetryLog)
│   ├── .env                        — Backend environment variables (not committed)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.tsx                 — BrowserRouter + ProtectedRoute + all routes
    │   ├── main.tsx                — React 19 entry point
    │   ├── index.css               — Global glass utilities, animations, CSS tokens
    │   ├── App.css
    │   ├── BackendUrl/
    │   │   ├── BackendUrl.tsx      — Hardcoded production backend URL export
    │   │   └── ExampleBackendUrl.tsx — env-aware fallback (for dev)
    │   ├── Store/
    │   │   └── useAuthStore.ts     — Zustand store (userId, streamPanel state)
    │   ├── Validations/
    │   │   └── schemas.ts          — Zod validation schemas
    │   ├── Ui/
    │   │   ├── Buttons/GlassButton.tsx
    │   │   └── Icons/SentinelIcon.tsx
    │   ├── Components/
    │   │   ├── Navbar.tsx           — Fixed glass top nav
    │   │   ├── FloatingDock.tsx     — Vertical glass sidebar dock
    │   │   ├── GlassCard.tsx        — Reusable glassmorphism card
    │   │   ├── AgentStatusBadge.tsx — Pulse dot status badge
    │   │   ├── ThreeBackground.tsx  — Three.js neural net particles
    │   │   ├── WebGLShader.tsx      — WebGL animated cyber-grid
    │   │   ├── ScanLine.tsx         — CSS scan animation
    │   │   ├── TerminalMockup.tsx   — GSAP typewriter terminal
    │   │   ├── MetricCard.tsx       — KPI stat card
    │   │   ├── AgentCard.tsx        — Agent status tile
    │   │   ├── ActivityFeed.tsx     — Real-time event log
    │   │   └── StreamPanel.tsx      — Job status poll + slide-out panel
    │   └── Pages/
    │       ├── LandingPage.tsx      — Public marketing page
    │       ├── LogIn.tsx            — Workspace identity setup
    │       ├── SignUp.tsx           — "Why Sentinel.OS" onboarding
    │       ├── Dashboard.tsx        — Central Command (real API data)
    │       ├── Ingestion.tsx        — File upload (POST /file)
    │       ├── Diagnostics.tsx      — Scan history (GET /history)
    │       ├── GitHubHub.tsx        — GitHub webhook info
    │       ├── SemanticSearch.tsx   — RAG search (POST /search)
    │       ├── Playground.tsx       — Raw/file scan (POST /raw + /file)
    │       ├── Analytics.tsx        — Historical scan analytics
    │       └── LegalConsole.tsx     — Compliance and audit info
    ├── .env                        — VITE_BACKEND_URL (not committed)
    ├── .env.example                — Template for contributors
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.cjs
    └── postcss.config.cjs
```

---

## Deployment (Vercel — Both Frontend and Backend)

### Prerequisites

- MongoDB Atlas cluster (free tier works)
- Pinecone account with a `sentinel-os` index (768 dimensions, cosine metric)
- Redis instance (Upstash recommended for serverless — free tier)
- Google AI Studio API key (for Gemini + embeddings)

### Backend Deployment

1. Push the `backend/` folder to a separate GitHub repository (or monorepo)
2. Import into Vercel → Framework: **Other**
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Add environment variables in Vercel dashboard:

```env
GOOGLE_SDK_API_CREDENTIALS=your_google_ai_api_key
GEMINI_API_KEY=your_google_ai_api_key
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/SentinalOS?retryWrites=true&w=majority
REDIS_URL=rediss://default:password@your-upstash-host:port
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=sentinel-os
FRONTEND_URL=https://your-sentinel-frontend.vercel.app
```

6. Deploy — note the deployment URL (e.g., `https://sentinal-os-backend.vercel.app`)

> **Note on Redis + BullMQ:** Vercel serverless functions do not support persistent workers. For production, run the `scanWorker.ts` on a separate persistent Node.js process (Render, Railway, or a DigitalOcean droplet). The Express API can stay on Vercel.

### Frontend Deployment

1. Import `frontend/` into Vercel → Framework: **Vite**
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Add environment variable:

```env
VITE_BACKEND_URL=https://sentinal-os-backend.vercel.app
```

5. Update `src/BackendUrl/BackendUrl.tsx` with your deployed backend URL
6. Deploy

---

## System Replication Method (Running Locally)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/Sentinal.OS.git
cd Sentinal.OS
```

### 2. Backend setup

```bash
cd backend
npm install

# Copy and fill your .env
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Start Redis locally (Docker)
docker run -d -p 6379:6379 redis:7

# Build and run
npm run dev
```

Backend will start on `http://localhost:5000`

### 3. Frontend setup

```bash
cd frontend
npm install

# Set backend URL
echo "VITE_BACKEND_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

Frontend will start on `http://localhost:5173`

### 4. First use

1. Open `http://localhost:5173`
2. Click **Launch Control Center** or **Sign In**
3. Enter a display name and workspace ID (e.g. `joshb`)
4. Go to **Playground** → paste TypeScript code → click **Run Scan**
5. Watch the **Stream Panel** for live job progress
6. Check **Diagnostics** for the full report with AI remediation suggestions

---

## Services Used

| Service | Free Tier | Purpose |
|---|---|---|
| **MongoDB Atlas** | 512 MB | Persistent scan reports, vulnerability findings |
| **Pinecone** | 1 index, 100K vectors | Code chunk semantic embeddings |
| **Redis (Upstash)** | 10K commands/day | BullMQ job queue backend |
| **Google AI Studio** | 60 req/min | Gemini AI analysis + text-embedding-004 |
| **Vercel** | Hobby tier | Frontend + backend serverless deployment |
| **GitHub Webhooks** | Free | Push event triggers for auto-scanning |

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


## License

MIT — Built by Bhavesh Joshi 

---

*Sentinel.OS was built out of a real need — not as a demo. Every component is wired to a real backend, processes real code, and returns real AI-generated security insights.*
