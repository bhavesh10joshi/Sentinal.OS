import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  // Whether to apply the hover lift animation
  hoverable?: boolean
  // Optional header content rendered above a thin divider
  header?: React.ReactNode
  onClick?: () => void
}

// Reusable glass morphism card — the core visual building block of Aegis Core
export function GlassCard({ children, className = '', hoverable = false, header, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-xl overflow-hidden ${hoverable ? 'card-hover cursor-pointer' : ''} ${className}`}
    >
      {header && (
        <>
          <div className="px-5 py-4 border-b border-black/5">
            {header}
          </div>
        </>
      )}
      <div className={header ? 'p-5' : 'p-5'}>
        {children}
      </div>
    </div>
  )
}
