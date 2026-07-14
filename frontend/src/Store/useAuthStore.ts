import { create } from 'zustand'

// Auth user shape
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  // UI state
  streamPanelOpen: boolean
  streamPanelContent: string
  // Actions
  setAuth: (user: User, token: string) => void
  logout: () => void
  openStreamPanel: (content: string) => void
  closeStreamPanel: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('sentinel_token'),
  isAuthenticated: !!localStorage.getItem('sentinel_token'),

  streamPanelOpen: false,
  streamPanelContent: '',

  setAuth: (user, token) => {
    localStorage.setItem('sentinel_token', token)
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('sentinel_token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  openStreamPanel: (content) => set({ streamPanelOpen: true, streamPanelContent: content }),
  closeStreamPanel: () => set({ streamPanelOpen: false }),
}))
