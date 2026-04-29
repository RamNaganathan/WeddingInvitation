export default function TransitionOverlay({ active }) {
  return (
    <div
      className={`transition-overlay${active ? ' in' : ''}`}
      aria-hidden="true"
    />
  )
}
