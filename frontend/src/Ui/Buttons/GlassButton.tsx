import React from 'react'

interface GlassButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

// Reusable Aegis-style tactile button
export function GlassButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}: GlassButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary:
      'bg-primary-container text-on-primary-container shadow-md hover:scale-[1.02] hover:shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-white/40 backdrop-blur-sm border border-outline-variant/30 text-on-surface hover:bg-white/60 hover:border-outline-variant/60',
    danger:
      'bg-error-container text-on-error-container hover:scale-[1.02] border border-error/10',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
