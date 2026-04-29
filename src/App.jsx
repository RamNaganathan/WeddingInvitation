import { useState, useCallback, useRef, useEffect } from 'react'
import TransitionOverlay from './components/TransitionOverlay'
import LandingPage from './components/LandingPage'
import VenuePage from './components/VenuePage'
import IntroPage, { MuteIcon } from './components/IntroPage'
import templeBg from './assets/temple.png'
import cloudsBg from './assets/grayscale-clouds.png'
import bgMusic from './assets/until_i_found_you.ogg'
import elephantCorner from './assets/corner-elephant.png'
import flowerCorner from './assets/corner-flowers.png'

const VISITOR_COUNTER_URL = 'https://api.counterapi.dev/v1/ramnaganathan-weddinginvitation/app-opens/up'
const VISITOR_SESSION_KEY = 'weddinginvitation_open_counted'



function Decorations({ isZooming }) {
  return (
    <>
      {/* Background Layer (Behind Temple) */}
      <div className={`fixed inset-0 pointer-events-none app-blur-anim ${isZooming ? 'is-zooming' : ''}`} style={{ zIndex: -14 }}>
        <div className="frame-border" />
      </div>

      {/* Foreground Layer (In front of Temple) */}
      <div className={`fixed inset-0 pointer-events-none app-blur-anim ${isZooming ? 'is-zooming' : ''}`} style={{ zIndex: -9 }}>
        <div className="corner-ornament corner-tl">
          <img src={flowerCorner} alt="" />
        </div>
        <div className="corner-ornament corner-tr">
          <img src={flowerCorner} alt="" />
        </div>
        <div className="corner-ornament corner-bl">
          <img src={elephantCorner} alt="" />
        </div>
        <div className="corner-ornament corner-br">
          <img src={elephantCorner} alt="" />
        </div>
      </div>
    </>
  )
}

// Pages: 'landing' | 'venue'


export default function App() {
  const [page, setPage] = useState('landing')
  const [overlayActive, setOverlay] = useState(false)
  const isZooming = false

  // Background music
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  useEffect(() => {
    const imagesToLoad = [templeBg, cloudsBg, elephantCorner, flowerCorner]
    let loadedCount = 0

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount === imagesToLoad.length) {
        if (document.fonts) {
          document.fonts.ready.then(() => setAssetsLoaded(true))
        } else {
          setAssetsLoaded(true)
        }
      }
    }

    imagesToLoad.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = checkAllLoaded
      img.onerror = checkAllLoaded
    })
  }, [])

  useEffect(() => {
    // Count one open per browser session in production deployments.
    if (!import.meta.env.PROD) return
    if (sessionStorage.getItem(VISITOR_SESSION_KEY) === '1') return

    fetch(VISITOR_COUNTER_URL, { method: 'GET', cache: 'no-store' })
      .then(() => {
        sessionStorage.setItem(VISITOR_SESSION_KEY, '1')
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    // Pause audio when switching tabs or closing browser
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause()
      }
    }

    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handleBegin = ({ muted: startMuted }) => {
    if (audioRef.current) {
      audioRef.current.muted = startMuted
      audioRef.current.play().catch(() => { })
    }
    setMuted(startMuted)
    // IntroPage handles its own fade; remove it from DOM after transition
    setTimeout(() => setIntroVisible(false), 700)
  }

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted
    setMuted(m => !m)
  }

  const transition = useCallback((callback) => {
    setOverlay(true)
    setTimeout(() => {
      callback()
      window.scrollTo(0, 0)
      setTimeout(() => setOverlay(false), 100)
    }, 380)
  }, [])

  const goToVenue = () => transition(() => setPage('venue'))

  const goBack = (target) => transition(() => setPage(target))

  return (
    <>
      {/* Loading Spinner Overlay */}
      {!assetsLoaded && (
        <div className="loading-spinner-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      )}

      {/* Background music */}
      <audio ref={audioRef} src={bgMusic} loop preload="auto" />

      {/* Intro splash */}
      {introVisible && <IntroPage onBegin={handleBegin} />}

      {/* Floating mute button — hidden while intro is showing */}
      {!introVisible && (
        <button
          onClick={toggleMute}
          title={muted ? 'Unmute music' : 'Mute music'}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          className="mute-btn-fixed"
        >
          <MuteIcon muted={muted} />
        </button>
      )}

      <div className={`app-bg app-blur-anim ${isZooming ? 'is-zooming' : ''}`} style={{ backgroundImage: `radial-gradient(circle at bottom center, #ffc000 0%, #ff0030 100%), url(${cloudsBg})` }} />
      <div className={`temple-bg app-blur-anim ${isZooming ? 'is-zooming' : ''}`} style={{ backgroundImage: `url(${templeBg})` }} />
      <Decorations isZooming={isZooming} />
      <TransitionOverlay active={overlayActive} />

      {!introVisible && (
        <main className={`page-transition-wrapper ${overlayActive ? 'fade-out' : ''} ${isZooming ? 'is-zooming' : ''}`}>
          {page === 'landing' && <LandingPage onEnter={goToVenue} />}
          {page === 'venue' && <VenuePage city="chennai" onBack={() => goBack('landing')} />}
        </main>
      )}
    </>
  )
}
