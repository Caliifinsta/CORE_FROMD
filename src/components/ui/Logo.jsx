/**
 * Logo de marca de Banco GNB — Core Financiero.
 * Isotipo: cuadrado verde con árbol blanco + wordmark "BANCO GNB / PERÚ".
 */
export default function Logo({ size = 44, wordmark = true, variant = 'dark' }) {
  const textColor  = variant === 'light' ? '#ffffff' : '#1a3d1c'
  const accentColor = variant === 'light' ? '#b8f0b8' : '#2c7a2e'
  const subColor   = variant === 'light' ? 'rgba(255,255,255,.8)' : '#6b6b7b'
  const nameSize   = Math.round(size * 0.5)
  const subSize    = Math.max(9, Math.round(size * 0.23))

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Banco GNB"
        role="img"
      >
        <rect x="0" y="0" width="48" height="48" rx="10" fill="#4caf50" />
        {/* Copa del árbol */}
        <circle cx="24" cy="16" r="9" fill="#ffffff" />
        <circle cx="16" cy="22" r="7" fill="#ffffff" />
        <circle cx="32" cy="22" r="7" fill="#ffffff" />
        <circle cx="24" cy="24" r="8" fill="#ffffff" />
        {/* Tronco */}
        <rect x="21.3" y="26" width="5.4" height="14" rx="1.5" fill="#ffffff" />
        {/* Raíces */}
        <path d="M21.3 39 q-4 1.5 -6.5 4" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        <path d="M26.7 39 q4 1.5 6.5 4" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </svg>

      {wordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.04 }}>
          <span style={{ fontWeight: 800, fontSize: nameSize, letterSpacing: '-0.5px' }}>
            <span style={{ color: textColor }}>BANCO </span>
            <span style={{ color: accentColor }}>GNB</span>
          </span>
          <span style={{ fontSize: subSize, fontWeight: 700, color: subColor, letterSpacing: '1.2px' }}>
            PERÚ
          </span>
        </span>
      )}
    </span>
  )
}