import { useState, useEffect } from 'react'

const toggleStyle = {
  background: '#fed5cc87',
  border: '1px solid var(--magenta-dark)',
  borderRadius: '50%',
  width: '44px',
  height: '44px',
  cursor: 'pointer',
  color: 'var(--magenta-dark)',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  WebkitBackdropFilter: 'blur(4px)',
  backdropFilter: 'blur(4px)',
  transform: 'translateZ(0)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
}

function MuteIcon({ muted }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {muted
        ? <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
        : <>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </>}
    </svg>
  )
}

function FullscreenIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {active
        ? <>
          <polyline points="8 3 3 3 3 8" />
          <polyline points="21 8 21 3 16 3" />
          <polyline points="3 16 3 21 8 21" />
          <polyline points="16 21 21 21 21 16" />
        </>
        : <>
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </>}
    </svg>
  )
}

export default function IntroPage({ onBegin }) {
  const [muted, setMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { })
    } else {
      document.exitFullscreen().catch(() => { })
    }
  }

  const handleBegin = () => {
    setFading(true)
    setTimeout(() => onBegin({ muted }), 700)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: 'transparent',
        backgroundImage: `
          radial-gradient(ellipse at 10% 20%, rgba(168,50,40,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 80%, rgba(78,122,48,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)
        `,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        gap: '2rem',
        padding: '2rem',
        paddingTop: '30vh'
      }}
    >
      {/* Mandala ring — mirrors LandingPage */}
      <div className="mandala-bg" style={{ pointerEvents: 'none' }} />

      {/* Branding */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '3rem', color: 'var(--magenta-mid)', lineHeight: 1 }}>ॐ</div>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(5rem, 7vw, 5rem)',
          background: 'linear-gradient(135deg, var(--magenta-dark), var(--magenta-mid), var(--magenta-lightest), var(--magenta-mid), var(--magenta-dark))',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'magentaShimmer 3s linear infinite',
          marginTop: '0.25rem',
        }}>Hemalatha &amp; Ram</p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: '0.90rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
          Wedding Invitation · June 3 &amp; 4, 2026
        </p>
      </div>

      {/* Divider */}
      <div style={{ width: '120px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--magenta-mid), transparent)', position: 'relative', zIndex: 1 }} />

      {/* Controls row: [fullscreen] [▶ play] [mute] */}
      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>

        <button onClick={toggleFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} style={toggleStyle}>
          <FullscreenIcon active={isFullscreen} />
        </button>

        {/* Play / Begin */}
        <button
          onClick={handleBegin}
          title="Begin"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, var(--magenta-dark), var(--magenta-mid))',
            cursor: 'pointer',
            color: 'var(--beige-lightest)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(160,120,40,0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(160,120,40,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(160,120,40,0.4)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </button>

        <button onClick={() => setMuted(m => !m)} title={muted ? 'Enable music' : 'Mute music'} style={toggleStyle}>
          <MuteIcon muted={muted} />
        </button>
      </div>
    </div>
  )
}

// Named export so App.jsx can reuse the same icon in the floating mute button
export { MuteIcon }
