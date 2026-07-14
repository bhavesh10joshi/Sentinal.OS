// Sentinel.OS SVG logo mark
export function SentinelIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield base */}
      <path
        d="M16 2L4 7v9c0 7.18 5.14 13.9 12 15.93C23.86 29.9 28 23.18 28 16V7L16 2Z"
        fill="#0059b5"
        opacity="0.15"
      />
      <path
        d="M16 2L4 7v9c0 7.18 5.14 13.9 12 15.93C23.86 29.9 28 23.18 28 16V7L16 2Z"
        stroke="#0059b5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner circuit mark */}
      <circle cx="16" cy="15" r="3.5" stroke="#0071e3" strokeWidth="1.5" />
      <line x1="16" y1="8" x2="16" y2="11.5" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="18.5" x2="16" y2="22" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="15" x2="12.5" y2="15" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19.5" y1="15" x2="23" y2="15" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
