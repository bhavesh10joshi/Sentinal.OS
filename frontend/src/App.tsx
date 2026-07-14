import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import { LegalConsole } from './Pages/LegalConsole'
import { useAuthStore } from './Store/useAuthStore'

// Root route — redirect to dashboard if authenticated, else landing page
function RootRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) {
    return <Dashboard />
  }
  return <LandingPage />
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Root — auto-redirects based on auth */}
          <Route path="/" element={<RootRoute />} />

          {/* Public */}
          <Route path="/LandingPage"      element={<LandingPage />} />
          <Route path="/Sentinel/Login"   element={<LogIn />} />
          <Route path="/Sentinel/SignUp"  element={<SignUp />} />

          {/* Authenticated app routes */}
          <Route path="/Sentinel/Dashboard"   element={<Dashboard />} />
          <Route path="/Sentinel/Ingestion"   element={<Ingestion />} />
          <Route path="/Sentinel/Diagnostics" element={<Diagnostics />} />
          <Route path="/Sentinel/GitHub"      element={<GitHubHub />} />
          <Route path="/Sentinel/Search"      element={<SemanticSearch />} />
          <Route path="/Sentinel/Playground"  element={<Playground />} />
          <Route path="/Sentinel/Analytics"   element={<Analytics />} />
          <Route path="/Sentinel/Legal"       element={<LegalConsole />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
