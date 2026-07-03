import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts'

const CustomTooltip = ({ active, payload, label, sufijo }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', border: '1px solid #e8ddf0', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 4px 16px rgba(107,45,139,0.15)', fontSize: 13,
    }}>
      <div style={{ fontWeight: 700, color: '#6B2D8B', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#1a1a2e', fontWeight: 600 }}>
        {Number(payload[0].value).toLocaleString('es-PE', { minimumFractionDigits: 2 })}{sufijo}
      </div>
    </div>
  )
}

/**
 * Gráfico de línea/área genérico con paleta Banco Ripley.
 * data: [{ [xKey]: ..., [yKey]: number }]
 */
export default function GraficoLinea({
  data = [],
  xKey = 'periodomes',
  yKey = 'valor',
  color = '#6B2D8B',
  refY = null,
  refLabel,
  sufijo = '',
  area = true,
}) {
  if (!data.length) {
    return <p className="page-subtitle">Sin datos para graficar.</p>
  }

  const gradId = `grad-${yKey}`

  if (area) {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0e8f5" vertical={false} />
          <XAxis dataKey={xKey} fontSize={11} tick={{ fill: '#6b6b7b' }} axisLine={false} tickLine={false} />
          <YAxis fontSize={11} tick={{ fill: '#6b6b7b' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}${sufijo}`} />
          <Tooltip content={<CustomTooltip sufijo={sufijo} />} />
          {refY != null && (
            <ReferenceLine y={refY} stroke="#dc2626" strokeDasharray="5 5"
              label={{ value: refLabel, position: 'insideTopRight', fontSize: 11, fill: '#dc2626' }} />
          )}
          <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={3}
            fill={`url(#${gradId})`} dot={false} activeDot={{ r: 6, fill: color }} />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0e8f5" vertical={false} />
        <XAxis dataKey={xKey} fontSize={11} tick={{ fill: '#6b6b7b' }} axisLine={false} tickLine={false} />
        <YAxis fontSize={11} tick={{ fill: '#6b6b7b' }} axisLine={false} tickLine={false}
          tickFormatter={(v) => `${v}${sufijo}`} />
        <Tooltip content={<CustomTooltip sufijo={sufijo} />} />
        {refY != null && (
          <ReferenceLine y={refY} stroke="#dc2626" strokeDasharray="5 5"
            label={{ value: refLabel, position: 'insideTopRight', fontSize: 11, fill: '#dc2626' }} />
        )}
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={3}
          dot={false} activeDot={{ r: 6, fill: color }} />
      </LineChart>
    </ResponsiveContainer>
  )
}