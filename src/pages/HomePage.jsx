import { useState } from 'react'
import { ShieldCheck, User, Lock, LogIn } from 'lucide-react'
import Logo from '../components/ui/Logo.jsx'
import Carrusel from '../components/ui/Carrusel.jsx'
import { useAuth } from '../hooks/useAuth.js'
import '../styles/home.css'

const chips = (arr) => (
  <div className="carrusel__chips">
    {arr.map((v) => <span className="carrusel__chip" key={v}>{v}</span>)}
  </div>
)

/* ── SVGs con paleta Ripley ── */

// Mensaje del día — gradiente morado
const SvgMensaje = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-msg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a0a40" />
        <stop offset="1" stopColor="#6B2D8B" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-msg)" />
    <circle cx="840" cy="150" r="200" fill="#ffffff" opacity="0.05" />
    <circle cx="900" cy="560" r="140" fill="#E31837" opacity="0.12" />
    <circle cx="100" cy="500" r="120" fill="#F7941D" opacity="0.08" />
    {/* Estrella decorativa */}
    <g transform="translate(680,210)" fill="#ffffff" opacity="0.9">
      <path d="M120 0 C134 70 170 106 240 120 C170 134 134 170 120 240 C106 170 70 134 0 120 C70 106 106 70 120 0 Z" />
      <path d="M250 160 c6 28 22 44 50 50 c-28 6 -44 22 -50 50 c-6 -28 -22 -44 -50 -50 c28 -6 44 -22 50 -50 Z" opacity="0.7" />
    </g>
    {/* Franja Ripley inferior */}
    <rect x="0" y="610" width="430" height="30" fill="#6B2D8B" opacity="0.8" />
    <rect x="430" y="610" width="200" height="30" fill="#E31837" opacity="0.8" />
    <rect x="630" y="610" width="185" height="30" fill="#F7941D" opacity="0.8" />
    <rect x="815" y="610" width="185" height="30" fill="#FFC107" opacity="0.8" />
  </svg>
)

// Misión — diana morada
const SvgMision = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-mis" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6B2D8B" />
        <stop offset="1" stopColor="#4e1f68" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-mis)" />
    <circle cx="840" cy="150" r="170" fill="#ffffff" opacity="0.06" />
    <circle cx="200" cy="500" r="100" fill="#E31837" opacity="0.1" />
    <g transform="translate(650,190)">
      <circle cx="130" cy="130" r="125" fill="none" stroke="#ffffff" strokeWidth="14" opacity="0.9" />
      <circle cx="130" cy="130" r="80"  fill="none" stroke="#F7941D" strokeWidth="12" opacity="0.85" />
      <circle cx="130" cy="130" r="34"  fill="#FFC107" opacity="0.95" />
      <line x1="-10" y1="290" x2="150" y2="130" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
      <path d="M120 130 h34 v34" fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)

// Visión — ojo morado/naranja
const SvgVision = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-vis" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4e1f68" />
        <stop offset="1" stopColor="#6B2D8B" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-vis)" />
    <circle cx="850" cy="540" r="150" fill="#F7941D" opacity="0.1" />
    <circle cx="150" cy="150" r="100" fill="#E31837" opacity="0.08" />
    <g transform="translate(600,220)">
      <path d="M0 100 C100 -14 300 -14 400 100 C300 214 100 214 0 100 Z" fill="#ffffff" opacity="0.95" />
      <circle cx="200" cy="100" r="60"  fill="#6B2D8B" />
      <circle cx="200" cy="100" r="28"  fill="#F7941D" />
      <circle cx="220" cy="82"  r="10"  fill="#ffffff" />
    </g>
  </svg>
)

// Valores — gema morada
const SvgValores = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-val" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6B2D8B" />
        <stop offset="1" stopColor="#E31837" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-val)" />
    <circle cx="840" cy="150" r="170" fill="#ffffff" opacity="0.06" />
    <g transform="translate(660,190)" fill="#ffffff">
      <path d="M40 60 H200 L230 120 L120 260 L10 120 Z" opacity="0.95" />
      <path d="M40 60 L70 120 H10 Z" opacity="0.55" />
      <path d="M200 60 L170 120 H230 Z" opacity="0.55" />
      <path d="M70 120 H170 L120 260 Z" opacity="0.7" />
    </g>
  </svg>
)

// Lavado de activos — escudo morado
const SvgLavado = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-lav" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a0a40" />
        <stop offset="1" stopColor="#6B2D8B" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-lav)" />
    <circle cx="800" cy="120" r="150" fill="#F7941D" opacity="0.1" />
    <g transform="translate(700,340)">
      <path d="M85 0 L160 30 V96 C160 150 128 176 85 192 C42 176 10 150 10 96 V30 Z" fill="#ffffff" opacity="0.95" />
      <path d="M52 98 l24 24 l44 -56" fill="none" stroke="#6B2D8B" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
)

// Campaña — tarjeta Ripley
const SvgCampana = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-cam" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6B2D8B" />
        <stop offset="0.55" stopColor="#E31837" />
        <stop offset="1" stopColor="#F7941D" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-cam)" />
    <circle cx="820" cy="130" r="150" fill="#ffffff" opacity="0.07" />
    {/* Tarjeta estilizada */}
    <g transform="translate(640,220)">
      <rect x="0" y="0" width="290" height="180" rx="18" fill="#ffffff" opacity="0.15" />
      <rect x="0" y="0" width="290" height="180" rx="18" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
      <rect x="0" y="50" width="290" height="40" fill="#ffffff" opacity="0.2" />
      {/* Chip */}
      <rect x="20" y="70" width="40" height="30" rx="5" fill="#FFC107" opacity="0.9" />
      {/* Logo R */}
      <text x="240" y="30" fill="#ffffff" fontSize="36" fontWeight="900" opacity="0.9">R</text>
      {/* Franja inferior */}
      <rect x="0"   y="155" width="73"  height="25" rx="0" fill="#6B2D8B" opacity="0.7" />
      <rect x="73"  y="155" width="73"  height="25" fill="#E31837" opacity="0.7" />
      <rect x="146" y="155" width="72"  height="25" fill="#F7941D" opacity="0.7" />
      <rect x="218" y="155" width="72"  height="25" rx="0" fill="#FFC107" opacity="0.7" />
    </g>
  </svg>
)

// Metas — barras moradas
const SvgMetas = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-met" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4e1f68" />
        <stop offset="1" stopColor="#6B2D8B" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-met)" />
    <circle cx="800" cy="130" r="150" fill="#ffffff" opacity="0.06" />
    <g transform="translate(660,340)">
      <rect x="0"   y="100" width="55" height="100" rx="8" fill="#6B2D8B" opacity="0.9" />
      <rect x="75"  y="60"  width="55" height="140" rx="8" fill="#E31837" opacity="0.9" />
      <rect x="150" y="20"  width="55" height="180" rx="8" fill="#F7941D" opacity="0.9" />
      <rect x="225" y="50"  width="55" height="150" rx="8" fill="#FFC107" opacity="0.9" />
      <path d="M27 90 L102 48 L177 12 L252 38" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
      <circle cx="252" cy="38" r="10" fill="#ffffff" />
    </g>
  </svg>
)

// Seguridad digital
const SvgSeguridad = (
  <svg className="carrusel__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g-seg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1a0030" />
        <stop offset="1" stopColor="#6B2D8B" />
      </linearGradient>
    </defs>
    <rect width="1000" height="640" fill="url(#g-seg)" />
    <circle cx="200" cy="150" r="120" fill="#E31837" opacity="0.08" />
    <circle cx="850" cy="500" r="150" fill="#F7941D" opacity="0.08" />
    {/* Candado */}
    <g transform="translate(670,180)">
      <rect x="10" y="100" width="160" height="120" rx="14" fill="#ffffff" opacity="0.95" />
      <path d="M40 100 V65 a50 50 0 0 1 100 0 V100" fill="none" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
      <circle cx="90" cy="155" r="18" fill="#6B2D8B" />
      <rect x="82" y="155" width="16" height="26" rx="4" fill="#6B2D8B" />
    </g>
  </svg>
)

const FRASES_DIA = [
  'El mejor servicio empieza con una sonrisa. ¡Hagamos crecer al Perú emprendedor!',
  'Cada crédito bien evaluado es un sueño que despega. ¡Excelente semana!',
  'Tu cercanía con el cliente es nuestra mayor fortaleza. ¡A por las metas!',
  'Disciplina y constancia: así se construye una cartera sana.',
  'Hoy es un gran día para superar tus objetivos. ¡Vamos con todo!',
  'Trabajo en equipo: juntos llegamos más lejos. ¡Gracias por tu compromiso!',
  'Cierra la semana con orgullo: tu esfuerzo transforma vidas.',
]
const fraseDelDia = FRASES_DIA[new Date().getDay()]

const VALORES = ['Integridad', 'Compromiso', 'Trabajo en equipo', 'Innovación', 'Cercanía', 'Responsabilidad']

const SLIDES = [
  {
    badge: 'Mensaje del día',
    titulo: 'Hoy es un buen día',
    subtitulo: fraseDelDia,
    svg: SvgMensaje,
  },
  {
    badge: 'Nuestra esencia',
    titulo: 'Misión',
    subtitulo: 'Impulsar el desarrollo de los emprendedores del Perú con soluciones financieras inclusivas, ágiles y responsables.',
    svg: SvgMision,
    extra: chips(['Inclusión', 'Agilidad', 'Responsabilidad']),
  },
  {
    badge: 'Nuestra esencia',
    titulo: 'Visión',
    subtitulo: 'Ser el banco de referencia en el Perú, reconocido por tecnología, cercanía y solidez financiera.',
    svg: SvgVision,
    extra: chips(['Tecnología', 'Cercanía', 'Solidez']),
  },
  {
    badge: 'Nuestra esencia',
    titulo: 'Valores',
    subtitulo: 'Los principios que guían cada decisión.',
    svg: SvgValores,
    extra: chips(VALORES),
  },
  {
    badge: 'Hoy',
    titulo: 'Capacitación: Prevención de Lavado de Activos',
    subtitulo: 'Sesión obligatoria para asesores y administradores. Revisa tu correo institucional.',
    svg: SvgLavado,
  },
  {
    badge: 'Campaña',
    titulo: 'Campaña Banco Ripley — Crédito Fácil',
    subtitulo: 'Impulsa los créditos de consumo y microempresa. ¡Metas al máximo este mes!',
    svg: SvgCampana,
  },
  {
    badge: 'Productividad',
    titulo: 'Metas del mes',
    subtitulo: 'Revisa tu avance de colocaciones y cumplimiento en el dashboard.',
    svg: SvgMetas,
  },
  {
    badge: 'Seguridad',
    titulo: 'Protege la información del cliente',
    subtitulo: 'Recuerda: nunca compartas credenciales. La seguridad es responsabilidad de todos.',
    svg: SvgSeguridad,
  },
]

/* Decoración circular (reemplaza la flor multicolor del Andino) */
const CirculoRipley = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="90" fill="none" stroke="#ffffff" strokeWidth="18" opacity="0.15" />
    <circle cx="100" cy="100" r="60" fill="none" stroke="#F7941D" strokeWidth="12" opacity="0.2" />
    <circle cx="100" cy="100" r="30" fill="#E31837" opacity="0.2" />
    <circle cx="100" cy="100" r="14" fill="#FFC107" opacity="0.3" />
  </svg>
)

export default function HomePage() {
  const { loading, error, iniciarSesion } = useAuth()
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [recordar, setRecordar] = useState(true)
  const [olvido, setOlvido] = useState(false)

  function submit(e) {
    e.preventDefault()
    iniciarSesion(dni.trim(), password)
  }

  return (
    <div className="home">
      <div className="home__franja" />

      <header className="home-header">
        <Logo size={56} />
        <span className="home-header__chip">Sistema interno · Uso exclusivo del personal</span>
      </header>

      <div className="home-split">
        {/* Izquierda: carrusel */}
        <div className="split-info">
          <Carrusel slides={SLIDES} intervalo={6000} fill />
        </div>

        {/* Derecha: login */}
        <aside className="split-login">
          {/* Círculos decorativos Ripley en lugar de flores */}
          <CirculoRipley className="split-login__flor split-login__flor--1" />
          <CirculoRipley className="split-login__flor split-login__flor--2" />

          <div className="split-login__inner">
            <span className="split-login__secure">
              <ShieldCheck size={14} strokeWidth={2.6} /> Conexión segura
            </span>
            <h2>Inicia sesión</h2>
            <p className="split-login__sub">Acceso del personal · ingresa con tu DNI.</p>

            <form onSubmit={submit}>
              <div className="lp-field">
                <label htmlFor="dni">Número de DNI</label>
                <div className="lp-input">
                  <User className="lp-input__icon" size={18} />
                  <input
                    id="dni" type="text" value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ej. 12345678"
                    autoComplete="username" required
                  />
                </div>
              </div>
              <div className="lp-field">
                <label htmlFor="pwd">Contraseña</label>
                <div className="lp-input">
                  <Lock className="lp-input__icon" size={18} />
                  <input
                    id="pwd" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="(en desarrollo: tu DNI)"
                    autoComplete="current-password" required
                  />
                </div>
              </div>

              <div className="lp-row">
                <label>
                  <input type="checkbox" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} />
                  Recordarme
                </label>
                <button type="button" className="lp-link" onClick={() => setOlvido((v) => !v)}>
                  ¿Olvidó su contraseña?
                </button>
              </div>

              {olvido && (
                <div className="lp-hint">
                  Contacta al administrador de tu agencia para restablecer tu contraseña.
                </div>
              )}
              {error && <div className="lp-error">{error}</div>}

              <button className="btn-login" type="submit" disabled={loading}>
                <LogIn size={18} strokeWidth={2.4} />
                {loading ? 'Ingresando…' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        </aside>
      </div>

      <footer className="home-footer-bar">
        <span>© 2026 Banco Ripley · Core Financiero — Sistema interno</span>
        <span>
          <a href="#terminos">Términos</a> · <a href="#privacidad">Privacidad</a> ·{' '}
          <a href="#soporte">Soporte</a>
        </span>
      </footer>
    </div>
  )
}
