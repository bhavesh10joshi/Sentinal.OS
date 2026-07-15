import { create } from 'zustand'

// Reads the saved theme from localStorage (defaults to 'light')
const saved = localStorage.getItem('sentinel_theme') as 'light' | 'dark' | null

// Apply immediately on load to avoid flash of wrong theme
if (saved === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: saved ?? 'light',

  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('sentinel_theme', next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme: next })
  },
}))
