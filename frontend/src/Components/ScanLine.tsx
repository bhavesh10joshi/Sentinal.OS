// Animated horizontal scan line overlay — matches Aegis Core's scan animation
export function ScanLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="scan-line" />
    </div>
  )
}
