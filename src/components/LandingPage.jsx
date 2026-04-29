import { useEffect, useRef } from 'react'
import { GiFlowerEmblem } from 'react-icons/gi'
import { PiStarFourFill } from 'react-icons/pi'

const PETAL_COLORS = ['#D4AF37', '#A83228', '#4E7A30', '#EFB958', '#C9605A', '#8AAD6A']

export default function LandingPage({ onEnter }) {
  const petalsRef = useRef(null)

  useEffect(() => {
    // Create floating petals
    const container = petalsRef.current
    if (!container) return
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div')
      p.className = 'petal'
      const size = 6 + Math.random() * 8
      const isAlt = Math.random() > 0.5
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * -10}%;
        width: ${size}px;
        height: ${size}px;
        background: ${PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]};
        animation-duration: ${6 + Math.random() * 8}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: 0;
        border-radius: ${isAlt ? '50% 0 50% 0' : '0 50% 0 50%'};
      `
      container.appendChild(p)
    }
    return () => { container.innerHTML = '' }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') onEnter()
  }

  return (
    <section
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-8 overflow-hidden cursor-pointer"
      style={{
        backgroundColor: 'transparent',
        backgroundImage: `
          radial-gradient(ellipse at 10% 20%, rgba(168,50,40,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 80%, rgba(78,122,48,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)
        `,
      }}
      onClick={onEnter}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Click to view wedding details"
      tabIndex={0}
    >
      {/* Mandala rings */}
      <div className="mandala-bg" />

      {/* Petals */}
      <div className="petals-container" ref={petalsRef} />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center gap-2"
        style={{ animation: 'fadeInUp 1.2s ease both' }}
      >
        {/* <p
          className="font-lato tracking-[0.35em] text-xs uppercase"
          style={{ color: 'var(--magenta-dark)', animation: 'fadeInUp 1.4s ease both' }}
        >
          Naganathan & Chitra
        </p> */}

        <div className="garland-line">
          <GiFlowerEmblem style={{ color: 'var(--aqua-mid)', fontSize: '1.1rem' }} />
        </div>

        <p
          className="font-cormorant italic text-ink-mid"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', animation: 'fadeInUp 1.5s ease both' }}
        >
         We cordially invite you to celebrate the wedding of
        </p>

        {/* Names */}
        <div className="relative px-10 py-6">
          <div
            className="bride-name magenta-text px-2 pt-4"
            style={{ animation: 'magentaShimmer 3s linear infinite, fadeInUp 1.6s ease both' }}
          >
            Hemalatha
          </div>
          <span className="ampersand ampersand-text">
            &amp;
          </span>
          <div
            className="groom-name magenta-text px-2 pt-2"
            style={{ animation: 'magentaShimmer 3s linear infinite, fadeInUp 1.6s ease both', animationDelay: '0.15s' }}
          >
            Ram
          </div>
        </div>

        <div className="garland-line">
          <PiStarFourFill style={{ color: 'var(--green-mid)', fontSize: '1.1rem' }} />
        </div>
      </div>

      {/* Date pill — outside animated wrapper so backdrop-filter works */}
      <div
        className="relative z-10 mt-2 px-6 py-1.5 rounded-full"
        style={{
          background: '#fed5cc87',
          WebkitBackdropFilter: 'blur(4px)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(158, 16, 69, 0.15)',
          display: 'inline-block',
          animation: 'fadeInUp 1.8s ease both'
        }}
      >
        <p
          className="font-cormorant tracking-[0.25em] font-bold"
          style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: 'var(--magenta-dark)' }}
        >
          June 4 &nbsp;·&nbsp; 2026
        </p>
      </div>

      {/* CTA — no animated parent so backdrop-filter works */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-2">
        <div
          className="px-5 py-1.5 rounded-full"
          style={{
            background: '#fed5cc87',
            WebkitBackdropFilter: 'blur(4px)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(158, 16, 69, 0.1)',
            animation: 'fadeInUp 2s ease both',
          }}
        >
          <p className="font-lato font-medium tracking-[0.25em] text-[0.72rem] uppercase" style={{ color: 'var(--text-mid)' }}>
            Tap to open your invitation
          </p>
        </div>
      </div>
    </section>
  )
}
