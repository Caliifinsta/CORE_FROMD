import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Paleta oficial Banco Ripley
const COLORS = ['#6B2D8B', '#E31837', '#F7941D', '#FFC107', '#4e1f68', '#b5102a']

// Tooltip personalizado con estilo Ripley
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div style={{
      background: '#fff', border: '1px solid #e8ddf0', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(107,45,139,0.15)',
      fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, color: '#6B2D8B', marginBottom: 4 }}>{name}</div>
      <div style={{ color: '#1a1a2e', fontWeight: 600 }}>
        S/ {Number(value).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
      </div>
    </div>
  )
}

// Label personalizado dentro de cada slice
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null
  const RADIAN = Math.PI / 180
  const r = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
      fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

/**
 * Gráfico de dona para distribución de cartera (vigente vs vencida)
 * o saldos de ahorro por tipo de cuenta. Paleta Banco Ripley.
 * data: [{ name, value }]
 */
export default function GraficoTorta({ data = [] }) {
  const limpio = data.filter((d) => Number(d.value) > 0)
  if (!limpio.length) {
    return <p className="page-subtitle">Sin datos para graficar.</p>
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={limpio}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={110}
          paddingAngle={3}
          labelLine={false}
          label={CustomLabel}
        >
          {limpio.map((_, i) => (
            <Cell
              key={i}
              fill={COLORS[i % COLORS.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={10}
          formatter={(value) => (
            <span style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 600 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}