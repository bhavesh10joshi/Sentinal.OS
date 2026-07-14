import { create } from 'zustand'

// The backend identifies users purely by a userId string — no JWT/session tokens
// Users set their workspace identity once on first visit (stored in localStorage)
interface AuthState {
  userId: string | null
  displayName: string | null
  isIdentified: boolean

  // Stream panel (right-side slide-out showing live job logs)
  streamPanelOpen: boolean
  streamPanelJobId: string | null
  streamPanelLabel: string

  // Actions
  setIdentity: (userId: string, displayName: string) => void
  clearIdentity: () => void
  openStreamPanel: (jobId: string, label: string) => void
  closeStreamPanel: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: localStorage.getItem('sentinel_user_id'),
  displayName: localStorage.getItem('sentinel_display_name'),
  isIdentified: !!localStorage.getItem('sentinel_user_id'),

  streamPanelOpen: false,
  streamPanelJobId: null,
  streamPanelLabel: '',

  setIdentity: (userId, displayName) => {
    localStorage.setItem('sentinel_user_id', userId)
    localStorage.setItem('sentinel_display_name', displayName)
    set({ userId, displayName, isIdentified: true })
  },

  clearIdentity: () => {
    localStorage.removeItem('sentinel_user_id')
    localStorage.removeItem('sentinel_display_name')
    set({ userId: null, displayName: null, isIdentified: false })
  },

  openStreamPanel: (jobId, label) => set({ streamPanelOpen: true, streamPanelJobId: jobId, streamPanelLabel: label }),
  closeStreamPanel: () => set({ streamPanelOpen: false, streamPanelJobId: null }),
}))
