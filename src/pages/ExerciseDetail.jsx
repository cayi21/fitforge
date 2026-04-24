import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getExerciseBySlug } from '../data/exercises'
import { getGif, getImage } from '../data/exerciseMedia'

const TABS = ['Instructions', 'Cues', 'Mistakes']

const DIFFICULTY_BADGE = {
  beginner: 'badge--success',
  intermediate: 'badge--warning',
  advanced: 'badge--accent',
}

function ExerciseGif({ slug, emoji }) {
  const [status, setStatus] = useState('loading') // loading | loaded | error
  const gifUrl = getGif(slug)
  const imgUrl = getImage(slug)
  const src = gifUrl || imgUrl

  if (!src) {
    return (
      <div className="ex-gif-wrap ex-gif-wrap--placeholder">
        <span className="ex-gif-emoji">{emoji}</span>
        <span className="ex-gif-label">Demo coming soon</span>
      </div>
    )
  }

  return (
    <div className="ex-gif-wrap">
      {status === 'loading' && (
        <div className="ex-gif-skeleton">
          <span className="ex-gif-emoji pulse">{emoji}</span>
        </div>
      )}
      {status === 'error' && (
        <div className="ex-gif-wrap--placeholder">
          <span className="ex-gif-emoji">{emoji}</span>
          <span className="ex-gif-label">Demo unavailable</span>
        </div>
      )}
      <img
        src={src}
        alt={`Exercise demonstration`}
        className="ex-gif-img"
        style={{ display: status === 'loaded' ? 'block' : 'none' }}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {status === 'loaded' && gifUrl && (
        <div className="ex-gif-badge">GIF</div>
      )}
    </div>
  )
}

export default function ExerciseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const ex = getExerciseBySlug(slug)

  if (!ex) {
    return (
      <div className="empty-state" style={{ paddingTop: 80 }}>
        <div className="empty-state__icon">❓</div>
        <h3>Exercise not found</h3>
        <button className="btn btn--secondary" style={{ marginTop: 16 }} onClick={() => navigate('/exercises')}>
          Back to library
        </button>
      </div>
    )
  }

  return (
    <div className="section stack stack--lg" style={{ paddingBottom: 48 }}>
      {/* GIF demo */}
      <ExerciseGif slug={ex.slug} emoji={ex.emoji} />

      {/* Name + tags */}
      <div>
        <h2 style={{ marginBottom: 12 }}>{ex.name}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <span className={`badge ${DIFFICULTY_BADGE[ex.difficulty]}`}>{ex.difficulty}</span>
          <span className="badge badge--muted">{ex.movement_pattern}</span>
          {ex.equipment.length === 0
            ? <span className="badge badge--muted">bodyweight</span>
            : ex.equipment.map(e => <span key={e} className="badge badge--muted">{e}</span>)
          }
        </div>

        <div>
          <p className="section-title" style={{ marginBottom: 8 }}>Primary Muscles</p>
          <div className="muscle-tags">
            {ex.primary_muscles.map(m => <span key={m} className="muscle-tag">{m}</span>)}
          </div>
          {ex.secondary_muscles.length > 0 && (
            <>
              <p className="section-title" style={{ marginTop: 12, marginBottom: 8 }}>Secondary Muscles</p>
              <div className="muscle-tags">
                {ex.secondary_muscles.map(m => <span key={m} className="muscle-tag muscle-tag--secondary">{m}</span>)}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="tab-bar">
          {TABS.map((t, i) => (
            <button key={t} className={`tab ${tab === i ? 'tab--active' : ''}`} onClick={() => setTab(i)}>
              {t}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div className="instructions-list">
            {ex.instructions.map((step, i) => (
              <div key={i} className="instruction-step">
                <div className="instruction-step__num">{i + 1}</div>
                <p className="instruction-step__text">{step}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 1 && (
          <div>
            <div className="cue-section">
              <h4>Setup</h4>
              <div className="cue-list">
                {ex.setup_cues.map((cue, i) => (
                  <div key={i} className="cue-item">{cue}</div>
                ))}
              </div>
            </div>
            <div className="cue-section">
              <h4>Execution</h4>
              <div className="cue-list">
                {ex.execution_cues.map((cue, i) => (
                  <div key={i} className="cue-item">{cue}</div>
                ))}
              </div>
            </div>
            <div className="cue-section">
              <h4>Breathing</h4>
              <div className="cue-list">
                <div className="cue-item">{ex.breathing_cue}</div>
              </div>
            </div>
            <div className="cue-section">
              <h4>Coaching Tip</h4>
              <div className="card card--accent" style={{ marginTop: 0 }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{ex.coaching_tip}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div>
            {ex.common_mistakes.map((m, i) => (
              <div key={i} className="mistake-item">
                <span className="mistake-item__icon">⚠️</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alternatives */}
      {ex.alternatives.length > 0 && (
        <div>
          <p className="section-title">Alternative Exercises</p>
          <div className="alt-chips">
            {ex.alternatives.map(slug => {
              const alt = getExerciseBySlug(slug)
              if (!alt) return null
              return (
                <button key={slug} className="alt-chip" onClick={() => navigate(`/exercises/${slug}`)}>
                  {alt.emoji} {alt.name}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
