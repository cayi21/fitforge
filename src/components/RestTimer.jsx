import { useState, useEffect, useCallback } from 'react'

const DURATIONS = [30, 60, 90, 120]

export default function RestTimer({ onClose }) {
  const [duration, setDuration] = useState(90)
  const [remaining, setRemaining] = useState(90)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    if (remaining <= 0) {
      setRunning(false)
      return
    }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [running, remaining])

  const setDur = useCallback(d => {
    setDuration(d)
    setRemaining(d)
    setRunning(true)
  }, [])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const display = `${mins}:${secs.toString().padStart(2, '0')}`
  const progress = remaining / duration

  return (
    <div className="rest-timer-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <p className="rest-timer__label">Rest Timer</p>
        <div className="rest-timer__count" style={{ color: remaining <= 10 ? 'var(--danger)' : 'var(--accent)' }}>
          {remaining <= 0 ? 'Go!' : display}
        </div>

        {/* progress ring */}
        <svg width="160" height="160" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', opacity: 0.3, pointerEvents: 'none' }}>
          <circle cx="80" cy="80" r="70" fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle
            cx="80" cy="80" r="70" fill="none"
            stroke="var(--accent)" strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress)}`}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        <div className="rest-timer__options">
          {DURATIONS.map(d => (
            <button
              key={d}
              className={`btn btn--sm ${duration === d && running ? 'btn--primary' : 'btn--secondary'}`}
              onClick={() => setDur(d)}
            >
              {d}s
            </button>
          ))}
        </div>

        <button className="btn btn--ghost mt-16" onClick={onClose}>
          Skip rest
        </button>
      </div>
    </div>
  )
}
