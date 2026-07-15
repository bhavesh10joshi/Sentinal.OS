import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import { LandingPage } from './Pages/LandingPage'
import { LogIn } from './Pages/LogIn'
import { SignUp } from './Pages/SignUp'
import { Dashboard } from './Pages/Dashboard'
import { Ingestion } from './Pages/Ingestion'
import { Diagnostics } from './Pages/Diagnostics'
import { GitHubHub } from './Pages/GitHubHub'
import { SemanticSearch } from './Pages/SemanticSearch'
import { Playground } from './Pages/Playground'
import { Analytics } from './Pages/Analytics'
import { useAuthStore } from './Store/useAuthStore'
// LegalConsole removed — no backend data source, page served no purpose

// Guard wrapper — redirects to login if workspace identity is not set
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isIdentified = useAuthStore((s) => s.isIdentified)
  if (!isIdentified) {
    return <Navigate to="/Sentinel/Login" replace />
  }
  return <>{children}</>
}

// Root: land on dashboard if identified, else go to landing page
function RootRoute() {
  const isIdentified = useAuthStore((s) => s.isIdentified)
  return <Navigate to={isIdentified ? '/Sentinel/Dashboard' : '/LandingPage'} replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Root redirect */}
        <Route path="/" element={<RootRoute />} />

        {/* Public routes */}
        <Route path="/LandingPage"     element={<LandingPage />} />
        <Route path="/Sentinel/Login"  element={<LogIn />} />
        <Route path="/Sentinel/SignUp" element={<SignUp />} />

        {/* Protected — requires workspace identity to be set */}
        <Route path="/Sentinel/Dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/Sentinel/Ingestion"   element={<ProtectedRoute><Ingestion /></ProtectedRoute>} />
        <Route path="/Sentinel/Diagnostics" element={<ProtectedRoute><Diagnostics /></ProtectedRoute>} />
        <Route path="/Sentinel/GitHub"      element={<ProtectedRoute><GitHubHub /></ProtectedRoute>} />
        <Route path="/Sentinel/Search"      element={<ProtectedRoute><SemanticSearch /></ProtectedRoute>} />
        <Route path="/Sentinel/Playground"  element={<ProtectedRoute><Playground /></ProtectedRoute>} />
        <Route path="/Sentinel/Analytics"   element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
