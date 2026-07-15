import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../Store/useThemeStore'

// Floating theme toggle button — placed in FloatingDock and Navbar
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
                  hover:scale-110 active:scale-95
                  ${theme === 'dark'
                    ? 'bg-surface-container text-warning hover:bg-surface-container-high'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  } ${className}`}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
