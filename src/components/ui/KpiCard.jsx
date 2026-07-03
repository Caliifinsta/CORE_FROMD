/**
 * Tarjeta de indicador. valor + label + color de borde + icono opcional.
 */
export default function KpiCard({ label, valor, color, sufijo = '', icon: Icon, trend }) {
  const borderColor = color || '#6B2D8B'
  return (
    <div className="kpi-card" style={{ borderLeftColor: borderColor, position: 'relative', overflow: 'hidden' }}>
      {/* Fondo decorativo sutil */}
      <div style={{
        position: 'absolute', top: -18, right: -18,
        width: 70, height: 70, borderRadius: '50%',
        background: borderColor, opacity: 0.06, pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div className="kpi-card__label">{label}</div>
          <div className="kpi-card__value" style={{ color: borderColor }}>
            {valor}{sufijo}
          </div>
          {trend != null && (
            <div style={{
              fontSize: 11, fontWeight: 700, marginTop: 4,
              color: trend >= 0 ? '#16a34a' : '#dc2626',
            }}>
              {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}% vs anterior
            </div>
          )}
        </div>
        {Icon && (
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: borderColor + '18',
            display: 'grid', placeItems: 'center',
            flexShrink: 0, color: borderColor,
          }}>
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
      </div>
    </div>
  )
}