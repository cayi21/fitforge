import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlan, addSession, updateStreak, getLastSetForExercise, saveActiveSession, getActiveSession, clearActiveSession } from '../utils/storage'
import { getTodaysWorkout } from '../utils/planGenerator'
import SetRow from '../components/SetRow'
import RestTimer from '../components/RestTimer'

function makeEmptySet(weight = '', reps = '') {
  return { weight, reps, rpe: '', completed: false }
}

function initExercises(workoutExercises) {
  return workoutExercises.map(ex => ({
    id: ex.id,
    name: ex.name,
    slug: ex.slug,
    category: ex.category,
    sets: Array.from({ length: ex.sets }, () => makeEmptySet()),
  }))
}

export default function Workout() {
  const navigate = useNavigate()
  const plan = getPlan()
  const todaySlot = getTodaysWorkout(plan)
  const workout = todaySlot?.workout

  const [exercises, setExercises] = useState(() => {
    const saved = getActiveSession()
    if (saved?.exercises) return saved.exercises
    return workout ? initExercises(workout.exercises) : []
  })
  const [showTimer, setShowTimer] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summaryData, setSummaryData] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  // Persist active session
  useEffect(() => {
    saveActiveSession({ exercises, workoutName: workout?.name })
  }, [exercises, workout])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  const timerDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`

  function updateSet(exIdx, setIdx, newSet) {
    setExercises(prev => {
      const updated = prev.map((ex, ei) => {
        if (ei !== exIdx) return ex
        return { ...ex, sets: ex.sets.map((s, si) => si === setIdx ? newSet : s) }
      })
      return updated
    })
  }

  function checkSet(exIdx, setIdx) {
    const ex = exercises[exIdx]
    const set = ex.sets[setIdx]
    const nowDone = !set.completed
    updateSet(exIdx, setIdx, { ...set, completed: nowDone })
    if (nowDone) setShowTimer(true)
  }

  function addSet(exIdx) {
    setExercises(prev =>
      prev.map((ex, ei) => {
        if (ei !== exIdx) return ex
        const last = ex.sets[ex.sets.length - 1]
        return { ...ex, sets: [...ex.sets, makeEmptySet(last?.weight || '', last?.reps || '')] }
      })
    )
  }

  function removeSet(exIdx) {
    setExercises(prev =>
      prev.map((ex, ei) => {
        if (ei !== exIdx || ex.sets.length <= 1) return ex
        return { ...ex, sets: ex.sets.slice(0, -1) }
      })
    )
  }

  function finishWorkout() {
    const completedSets = exercises.reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0)
    const totalVolume = exercises.reduce((sum, ex) => {
      return sum + ex.sets.filter(s => s.completed).reduce((es, s) => {
        return es + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0)
      }, 0)
    }, 0)

    const prs = []
    exercises.forEach(ex => {
      const prevSets = getLastSetForExercise(ex.id)
      const prevBest = prevSets.reduce((max, s) => Math.max(max, parseFloat(s.weight) || 0), 0)
      const currentBest = ex.sets.filter(s => s.completed).reduce((max, s) => Math.max(max, parseFloat(s.weight) || 0), 0)
      if (currentBest > prevBest && currentBest > 0 && prevBest > 0) {
        prs.push({ name: ex.name, weight: currentBest })
      }
    })

    const session = {
      date: new Date().toISOString(),
      workoutName: workout?.name || 'Workout',
      exercises,
      duration: elapsed,
      completed: true,
    }
    addSession(session)
    updateStreak()
    clearActiveSession()

    setSummaryData({ completedSets, totalVolume: Math.round(totalVolume), duration: elapsed, prs })
    setShowSummary(true)
  }

  if (!workout) {
    return (
      <div style={{ paddingTop: 80, textAlign: 'center', padding: '100px 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>😴</div>
        <h2>Rest Day</h2>
        <p style={{ marginTop: 8 }}>No workout scheduled for today. Enjoy the recovery.</p>
        <button className="btn btn--primary" style={{ marginTop: 24 }} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="workout-header">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/dashboard')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span style={{ fontWeight: 700, fontSize: '1rem', flex: 1 }}>{workout.name}</span>
        <span className="workout-timer">{timerDisplay}</span>
        <button className="btn btn--sm" style={{ background: 'var(--success)', color: '#fff', borderRadius: 'var(--radius-sm)' }} onClick={finishWorkout}>
          Finish
        </button>
      </div>

      <div style={{ paddingTop: 72, paddingBottom: 100 }}>
        <div className="container stack stack--md" style={{ paddingTop: 16 }}>
          {exercises.map((ex, exIdx) => {
            const prevSets = getLastSetForExercise(ex.id)
            const completedCount = ex.sets.filter(s => s.completed).length

            return (
              <div key={ex.id} className="exercise-card">
                <div className="exercise-card__header">
                  <div className="row row--between">
                    <div className="exercise-card__name">{ex.name}</div>
                    <button
                      className="btn btn--ghost btn--sm"
                      style={{ fontSize: '0.75rem' }}
                      onClick={() => navigate(`/exercises/${ex.slug}`)}
                    >
                      How to →
                    </button>
                  </div>
                  <div className="exercise-card__tags">
                    <span className="tag">{ex.category}</span>
                    {completedCount > 0 && (
                      <span className="badge badge--success">{completedCount}/{ex.sets.length} sets done</span>
                    )}
                  </div>
                </div>

                <div className="sets-table">
                  <div className="sets-header">
                    <span>Set</span>
                    <span>Previous</span>
                    <span>kg</span>
                    <span>Reps</span>
                    <span>✓</span>
                  </div>
                  {ex.sets.map((set, setIdx) => (
                    <SetRow
                      key={setIdx}
                      setNum={setIdx + 1}
                      prevData={prevSets[setIdx] || null}
                      set={set}
                      onChange={newSet => updateSet(exIdx, setIdx, newSet)}
                      onCheck={() => checkSet(exIdx, setIdx)}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', borderTop: '1px solid var(--border-dim)' }}>
                  <button className="add-set-btn" style={{ flex: 1 }} onClick={() => addSet(exIdx)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Set
                  </button>
                  {ex.sets.length > 1 && (
                    <button
                      className="add-set-btn"
                      style={{ flex: 'none', width: 'auto', padding: '12px 16px', color: 'var(--danger)', fontSize: '0.8125rem' }}
                      onClick={() => removeSet(exIdx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sticky finish bar */}
      <div className="workout-finish-bar">
        <button className="btn btn--primary btn--full btn--lg" onClick={finishWorkout}>
          Finish Workout ✓
        </button>
      </div>

      {/* Rest timer */}
      {showTimer && <RestTimer onClose={() => setShowTimer(false)} />}

      {/* Summary modal */}
      {showSummary && summaryData && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{ fontSize: '2.5rem', textAlign: 'center' }}>🏆</div>
            <h2 className="modal__title" style={{ textAlign: 'center' }}>Workout Complete!</h2>

            <div className="modal__stats">
              <div className="modal__stat">
                <div className="modal__stat-value">
                  {Math.floor(summaryData.duration / 60)}m
                </div>
                <div className="modal__stat-label">Duration</div>
              </div>
              <div className="modal__stat">
                <div className="modal__stat-value">{summaryData.completedSets}</div>
                <div className="modal__stat-label">Sets Done</div>
              </div>
              <div className="modal__stat">
                <div className="modal__stat-value">
                  {summaryData.totalVolume > 0 ? `${Math.round(summaryData.totalVolume / 1000 * 10) / 10}k` : '—'}
                </div>
                <div className="modal__stat-label">Volume (kg)</div>
              </div>
            </div>

            {summaryData.prs.length > 0 && (
              <div>
                <p className="section-title">🎉 New Personal Records</p>
                <div className="pr-list">
                  {summaryData.prs.map((pr, i) => (
                    <div key={i} className="pr-item">
                      <span className="pr-item__badge">PR</span>
                      <span>{pr.name}</span>
                      <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--warning)' }}>{pr.weight}kg</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="btn btn--primary btn--full btn--lg" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  )
}
