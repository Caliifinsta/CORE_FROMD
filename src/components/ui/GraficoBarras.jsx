import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Colores por defecto Ripley si no se pasan desde afuera
const RIPLEY_COLORS = ['#6B2D8B', '#E31837', '#F7941D', '#FFC107', '#4e1f68']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: '1px solid #e8ddf0', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(107,45,139,0.15)', fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, color: '#6B2D8B', marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.fill, fontWeight: 600, marginBottom: 2 }}>
          {p.name}: S/ {Number(p.value).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
        </div>
      ))}
    </div>
  )
}

/**
 * Gráfico de barras genérico para la evolución histórica. Paleta Banco Ripley.
 * data: [{ periodomes, saldo_real, meta, ... }]
 * barras: [{ key, label, color? }]
 */
export default function GraficoBarras({ data = [], xKey = 'periodomes', barras = [] }) {
  if (!data.length) {
    return <p className="page-subtitle">Sin datos para graficar.</p>
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0e8f5" vertical={false} />
        <XAxis dataKey={xKey} fontSize={12} tick={{ fill: '#6b6b7b' }} axisLine={false} tickLine={false} />
        <YAxis fontSize={12} tick={{ fill: '#6b6b7b' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107,45,139,0.06)' }} />
        <Legend
          iconType="circle"
          iconSize={10}
          formatter={(value) => (
            <span style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 600 }}>{value}</span>
          )}
        />
        {barras.map((b, i) => (
          <Bar
            key={b.key}
            dataKey={b.key}
            name={b.label}
            fill={b.color || RIPLEY_COLORS[i % RIPLEY_COLORS.length]}
            radius={[6, 6, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}