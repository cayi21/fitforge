import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveProfile, savePlan } from '../utils/storage'
import { generatePlan } from '../utils/planGenerator'

const STEPS = 5

const GOALS = [
  { value: 'build_muscle', label: 'Build Muscle', icon: '💪', desc: 'Gain size and strength' },
  { value: 'lose_fat', label: 'Lose Fat', icon: '🔥', desc: 'Drop body fat, keep muscle' },
  { value: 'recomposition', label: 'Recomposition', icon: '⚖️', desc: 'Lose fat and build muscle' },
  { value: 'strength', label: 'Build Strength', icon: '🏋️', desc: 'Get stronger on the big lifts' },
  { value: 'general_fitness', label: 'General Fitness', icon: '🏃', desc: 'Feel healthy and active' },
]

const EXPERIENCES = [
  { value: 'beginner', label: 'Beginner', icon: '🌱', desc: 'Less than 1 year of training' },
  { value: 'intermediate', label: 'Intermediate', icon: '📈', desc: '1–3 years, consistent training' },
  { value: 'advanced', label: 'Advanced', icon: '🏆', desc: '3+ years, strong technique' },
]

const SESSION_LENGTHS = [
  { value: '30', label: '30 min' },
  { value: '45', label: '45 min' },
  { value: '60', label: '60 min' },
  { value: '75', label: '75+ min' },
]

const LOCATIONS = [
  { value: 'commercial', label: 'Commercial Gym', icon: '🏢', desc: 'Full equipment access' },
  { value: 'home', label: 'Home Gym', icon: '🏠', desc: 'Dumbbells and basic kit' },
  { value: 'bodyweight', label: 'Bodyweight Only', icon: '🤸', desc: 'No equipment needed' },
]

const SPLITS = [
  { value: 'recommended', label: 'Let FitForge decide', icon: '✨', desc: 'Based on your schedule' },
  { value: 'full_body', label: 'Full Body', icon: '🔄', desc: 'All muscles each session' },
  { value: 'upper_lower', label: 'Upper / Lower', icon: '↕️', desc: '4-day rotation' },
  { value: 'ppl', label: 'Push / Pull / Legs', icon: '🔁', desc: '5–6 day split' },
]

const NUTRITION_PREFS = [
  { value: 'high_protein', label: 'High Protein', icon: '🥩', desc: 'Meat, fish, eggs, dairy' },
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥦', desc: 'No meat, some dairy/eggs' },
  { value: 'budget', label: 'Budget-Friendly', icon: '💰', desc: 'Simple, affordable meals' },
  { value: 'simple', label: 'Simple Meals', icon: '⚡', desc: 'Quick and easy to prep' },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    goal: '',
    experience: '',
    daysPerWeek: 3,
    sessionLength: '45',
    location: '',
    split: 'recommended',
    nutritionPref: '',
  })

  function update(key, value) {
    setProfile(prev => ({ ...prev, [key]: value }))
  }

  function next() {
    if (step < STEPS) setStep(s => s + 1)
    else finish()
  }

  function back() {
    if (step > 1) setStep(s => s - 1)
    else navigate('/')
  }

  function canContinue() {
    if (step === 1) return !!profile.goal
    if (step === 2) return !!profile.experience
    if (step === 3) return !!profile.daysPerWeek && !!profile.sessionLength
    if (step === 4) return !!profile.location
    if (step === 5) return !!profile.nutritionPref
    return true
  }

  function finish() {
    const finalProfile = { ...profile, onboardingComplete: true }
    saveProfile(finalProfile)
    const plan = generatePlan(finalProfile)
    savePlan(plan)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="onboarding">
      <header className="onboarding__header">
        <button className="btn btn--ghost" style={{ padding: '8px 0' }} onClick={back}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="progress-dots">
          {Array.from({ length: STEPS }, (_, i) => (
            <div
              key={i}
              className={`progress-dot ${i + 1 === step ? 'progress-dot--active' : i + 1 < step ? 'progress-dot--done' : ''}`}
            />
          ))}
        </div>
      </header>

      <div className="onboarding__body">
        {step === 1 && (
          <>
            <p className="onboarding__step-label">Step 1 of 5</p>
            <h2 className="onboarding__title">What's your main goal?</h2>
            <p className="onboarding__sub">This shapes your entire programme.</p>
            <div className="option-grid">
              {GOALS.map(g => (
                <button
                  key={g.value}
                  className={`option-card ${profile.goal === g.value ? 'option-card--selected' : ''}`}
                  onClick={() => update('goal', g.value)}
                >
                  <div className="option-card__icon">{g.icon}</div>
                  <div className="option-card__label">{g.label}</div>
                  <div className="option-card__desc">{g.desc}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="onboarding__step-label">Step 2 of 5</p>
            <h2 className="onboarding__title">Experience level?</h2>
            <p className="onboarding__sub">We use this to set exercise complexity and volume.</p>
            <div className="option-grid option-grid--single" style={{ gap: 10 }}>
              {EXPERIENCES.map(e => (
                <button
                  key={e.value}
                  className={`option-card ${profile.experience === e.value ? 'option-card--selected' : ''}`}
                  onClick={() => update('experience', e.value)}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: '1.6rem' }}>{e.icon}</span>
                    <div>
                      <div className="option-card__label">{e.label}</div>
                      <div className="option-card__desc">{e.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="onboarding__step-label">Step 3 of 5</p>
            <h2 className="onboarding__title">Your schedule</h2>
            <p className="onboarding__sub">How many days per week can you train?</p>

            <div className="day-selector mb-24">
              {[2, 3, 4, 5, 6].map(d => (
                <button
                  key={d}
                  className={`day-btn ${profile.daysPerWeek === d ? 'day-btn--selected' : ''}`}
                  onClick={() => update('daysPerWeek', d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <p style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12 }}>How long per session?</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SESSION_LENGTHS.map(s => (
                <button
                  key={s.value}
                  className={`chip ${profile.sessionLength === s.value ? 'chip--active' : ''}`}
                  onClick={() => update('sessionLength', s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="onboarding__step-label">Step 4 of 5</p>
            <h2 className="onboarding__title">Where do you train?</h2>
            <p className="onboarding__sub">This determines which exercises we select for you.</p>
            <div className="option-grid option-grid--single" style={{ gap: 10 }}>
              {LOCATIONS.map(l => (
                <button
                  key={l.value}
                  className={`option-card ${profile.location === l.value ? 'option-card--selected' : ''}`}
                  onClick={() => update('location', l.value)}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: '1.6rem' }}>{l.icon}</span>
                    <div>
                      <div className="option-card__label">{l.label}</div>
                      <div className="option-card__desc">{l.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <p className="onboarding__step-label">Step 5 of 5</p>
            <h2 className="onboarding__title">A few preferences</h2>
            <p className="onboarding__sub">Optional — helps us tailor nutrition tips for you.</p>

            <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 10, color: 'var(--text-secondary)' }}>Training split preference</p>
            <div className="option-grid mb-24">
              {SPLITS.map(s => (
                <button
                  key={s.value}
                  className={`option-card ${profile.split === s.value ? 'option-card--selected' : ''}`}
                  onClick={() => update('split', s.value)}
                >
                  <div className="option-card__icon">{s.icon}</div>
                  <div className="option-card__label">{s.label}</div>
                  <div className="option-card__desc">{s.desc}</div>
                </button>
              ))}
            </div>

            <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 10, color: 'var(--text-secondary)' }}>Nutrition preference</p>
            <div className="option-grid">
              {NUTRITION_PREFS.map(n => (
                <button
                  key={n.value}
                  className={`option-card ${profile.nutritionPref === n.value ? 'option-card--selected' : ''}`}
                  onClick={() => update('nutritionPref', n.value)}
                >
                  <div className="option-card__icon">{n.icon}</div>
                  <div className="option-card__label">{n.label}</div>
                  <div className="option-card__desc">{n.desc}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="onboarding__footer">
        <button className="btn btn--secondary" onClick={back}>
          Back
        </button>
        <button
          className="btn btn--primary"
          onClick={next}
          disabled={!canContinue()}
          style={{ minWidth: 140 }}
        >
          {step === STEPS ? '🚀 Build my plan' : 'Continue →'}
        </button>
      </footer>
    </div>
  )
}
