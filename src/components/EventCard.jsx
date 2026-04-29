import { BsCalendar3, BsClock } from 'react-icons/bs'
import { GiFlowerTwirl, GiFlowers, GiMusicalNotes, GiCandleFlame, GiSparkles, GiBigDiamondRing, GiDoubleNecklace } from 'react-icons/gi'
import { MdRestaurant } from 'react-icons/md'

const EVENT_ICONS = {
  mehendi: <GiFlowerTwirl />,
  haldi: <GiFlowers />,
  sangeet: <GiMusicalNotes />,
  wedding: <GiDoubleNecklace />,
  reception: <GiSparkles />,
  meal: <MdRestaurant />,
  nischayathartham: <GiBigDiamondRing />,
}

const ACCENT_COLORS = {
  aqua: 'var(--aqua-mid)',
  blue: 'var(--aqua-mid)',
  green: 'var(--green-mid)',
  orange: 'var(--orange-mid)',
  gold: 'var(--gold-mid)',
  magenta: 'var(--magenta-mid)',
  dark: 'var(--text-mid)',
  maroon: 'var(--purple-mid)',
}

export default function EventCard({ event, index }) {
  const { name, icon, badge, accent, desc, date, time, effect } = event
  const accentColor = ACCENT_COLORS[accent] || 'var(--text-mid)'

  return (
    <div
      className={`event-card accent-${accent} ${effect === 'blur' ? 'effect-blur' : ''} rounded-2xl overflow-hidden relative`}
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      {/* Accent colour strip */}
      <div className="event-card-accent h-[5px] w-full" />

      {/* Card body */}
      <div className="px-5 pt-5 pb-4">
        {/* Badge */}
        <div className="event-badge inline-flex items-center gap-1.5 font-lato text-[0.62rem] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full mb-3">
          <span className="text-[0.9rem] leading-none">{EVENT_ICONS[icon]}</span>
          {badge}
        </div>

        {/* Name */}
        <div className="font-playfair text-2xl mb-1.5 font-normal" style={{ color: 'var(--text-dark)' }}>
          {name}
        </div>

        {/* Description */}
        <div className="font-lato text-[0.95rem] leading-relaxed mb-4" style={{ color: 'var(--text-dark)' }}>
          {desc}
        </div>

        {/* Meta rows */}
        <div className="event-card-meta flex flex-col gap-1.5 pt-4">
          <div className="flex items-center gap-2.5 font-lato text-[0.95rem] text-ink-dark">
            <BsCalendar3 className="w-[1.05rem] h-[1.05rem] shrink-0" style={{ color: accentColor }} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2.5 font-lato text-[0.95rem] text-ink-dark">
            <BsClock className="w-[1.05rem] h-[1.05rem] shrink-0" style={{ color: accentColor }} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
