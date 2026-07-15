import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Store/useThemeStore' // side-effect: applies saved theme class to <html> on startup
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
