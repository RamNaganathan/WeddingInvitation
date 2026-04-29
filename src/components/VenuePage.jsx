import { venues } from '../data/venues'
import EventCard from './EventCard'
import { IoArrowBack, IoChevronDown } from 'react-icons/io5'
import { MdLocationPin } from 'react-icons/md'
import { PiStarFourFill } from 'react-icons/pi'

export default function VenuePage({ city, onBack }) {
  const data = venues[city]
  if (!data) return null

  return (
    <section
      className="min-h-screen relative flex flex-col items-center overflow-hidden pt-20 pb-16 px-8"
      style={{
        backgroundColor: 'transparent',
        backgroundImage: `
          radial-gradient(ellipse at 0% 0%, rgba(78,122,48,0.07) 0%, transparent 40%),
          radial-gradient(ellipse at 100% 100%, rgba(168,50,40,0.07) 0%, transparent 40%)
        `,
      }}
    >

      {/* Back button */}
      <button
        id="back-to-landing"
        onClick={onBack}
        className="fixed top-6 left-6 z-50 glass-back-btn"
      >
        <IoArrowBack className="text-base" /> Back
      </button>

      {/* Venue header */}
      <div
        className="text-center mb-4 relative z-[2]"
        style={{ animation: 'fadeInUp 0.6s ease both' }}
      >
        {/* City tag */}
        <div
          className="inline-flex items-center gap-1.5 font-lato text-[0.7rem] tracking-[0.3em] uppercase border px-3.5 py-1 mb-4 rounded-sm"
          style={{
            background: 'var(--magenta-lightest)',
            borderColor: 'var(--magenta-mid)',
            color: 'var(--magenta-dark)',
          }}
        >
          <MdLocationPin className="text-base" /> {data.cityLabel}
        </div>

        <p
          className="font-cormorant font-light tracking-[0.05em] mb-1"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: 'var(--text-mid)' }}
        >
          Venue
        </p>

        <a
          id="venue-map-link"
          href={data.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-name-link"
        >
          {data.name}
          <span
            className="inline-block text-base ml-1.5 align-middle"
            style={{ color: 'var(--aqua-mid)', animation: 'bounce 2s ease-in-out infinite' }}
          >
            <MdLocationPin />
          </span>
        </a>

        <p
          className="font-lato text-[0.82rem] tracking-[0.05em] mt-1"
          style={{ color: 'var(--text-light)' }}
        >
          {data.address}
        </p>
      </div>

      {/* Divider */}
      <div className="section-divider">
        <PiStarFourFill style={{ color: 'var(--magenta-mid)', fontSize: '1rem' }} />
      </div>

      {/* Events */}
      <div
        className="w-full max-w-5xl grid gap-6 relative z-[2]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        {data.events.map((event, i) => (
          <EventCard key={`${event.name}-${event.date}`} event={event} index={i} />
        ))}
      </div>

      {/* Closing Invitation */}
      <div className="w-full max-w-5xl mt-16 relative z-[2] flex flex-col items-center">
        <div className="section-divider">
          <PiStarFourFill style={{ color: 'var(--magenta-mid)', fontSize: '1rem' }} />
        </div>

        <div
          className="rounded-2xl overflow-hidden p-8 w-full"
          style={{
            background: '#ccfef787',
            border: '1px solid rgba(0, 188, 212, 0.25)',
            WebkitBackdropFilter: 'blur(4px)',
            backdropFilter: 'blur(4px)',
            transform: 'translateZ(0)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          }}
        >
          <p
            className="font-cormorant italic text-center"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: 'var(--purple-mid)',
              lineHeight: '1.8',
              animation: 'fadeInUp 0.8s ease both',
            }}
          >
            We humbly request your presence and blessing as we embark on this sacred journey of togetherness.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint flex items-center gap-1.5">Scroll to explore <IoChevronDown /></div>
    </section>
  )
}
