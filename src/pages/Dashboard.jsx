import { useNavigate } from 'react-router-dom'
import { getProfile, getPlan, getStreak, getTotalStats, getSessions } from '../utils/storage'
import { getTodaysWorkout } from '../utils/planGenerator'
import { getDailyTip } from '../data/nutrition'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const GOAL_LABELS = {
  build_muscle: 'Build Muscle',
  lose_fat: 'Lose Fat',
  recomposition: 'Recomposition',
  strength: 'Build Strength',
  general_fitness: 'General Fitness',
}

const GREETINGS = ['Let\'s get after it', 'Ready to work?', 'Time to build', 'Let\'s go', 'Stay consistent']

function getDayOfWeek() {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

export default function Dashboard() {
  const navigate = useNavigate()
  const profile = getProfile()
  const plan = getPlan()
  const streak = getStreak()
  const stats = getTotalStats()
  const sessions = getSessions()

  const todaySchedule = plan?.weeklySchedule?.[getDayOfWeek()]
  const todayWorkout = getTodaysWorkout(plan)
  const tip = getDailyTip(profile?.goal)

  const completedDates = new Set(sessions.filter(s => s.completed).map(s => new Date(s.date).toDateString()))

  const greeting = GREETINGS[Math.floor(Date.now() / 86400000) % GREETINGS.length]

  return (
    <div className="dashboard section stack stack--lg">
      {/* Greeting */}
      <div className="greeting">
        <h2 className="greeting__name">Hey there 👋</h2>
        <p className="greeting__sub">{greeting} — {GOAL_LABELS[profile?.goal] || 'your goal'} mode</p>
      </div>

      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-card__value stat-card__value--accent">{streak?.current || 0}</div>
          <div className="stat-card__label">Day Streak 🔥</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{stats.totalSessions}</div>
          <div className="stat-card__label">Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">{stats.totalVolume > 0 ? `${Math.round(stats.totalVolume / 1000)}k` : '0'}</div>
          <div className="stat-card__label">kg Lifted</div>
        </div>
      </div>

      {/* Today's workout */}
      {todayWorkout?.workout ? (
        <div className="workout-card">
          <div className="workout-card__header">
            <div className="workout-card__tag">
              {todaySchedule?.isRest ? 'Next Workout' : 'Today\'s Workout'}
            </div>
            <div className="workout-card__title">{todayWorkout.workout.name}</div>
            <div className="workout-card__meta">
              {todayWorkout.workout.exercises?.length} exercises · ~{(todayWorkout.workout.exercises?.length || 0) * 8} min
            </div>
          </div>
          <div className="workout-card__body">
            <div className="exercise-preview">
              {(todayWorkout.workout.exercises || []).slice(0, 4).map((ex, i) => (
                <div key={i} className="exercise-preview__item">
                  <span className="exercise-preview__dot" />
                  <span>{ex.name}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {ex.sets} × {ex.repMin}–{ex.repMax}
                  </span>
                </div>
              ))}
              {(todayWorkout.workout.exercises || []).length > 4 && (
                <div className="exercise-preview__item">
                  <span className="exercise-preview__dot" style={{ background: 'var(--text-muted)' }} />
                  <span style={{ color: 'var(--text-muted)' }}>
                    +{todayWorkout.workout.exercises.length - 4} more exercises
                  </span>
                </div>
              )}
            </div>
            <button className="btn btn--primary btn--full" onClick={() => navigate('/workout')}>
              Start Workout →
            </button>
          </div>
        </div>
      ) : (
        <div className="card card--accent">
          <h3>Rest Day</h3>
          <p style={{ marginTop: 6 }}>Recovery is part of training. Hydrate, sleep well, and prepare for tomorrow.</p>
          <button className="btn btn--secondary btn--sm" style={{ marginTop: 14 }} onClick={() => navigate('/exercises')}>
            Browse exercises instead
          </button>
        </div>
      )}

      {/* Plan rationale */}
      {plan?.splitReason && (
        <div className="card">
          <p className="section-title">Your Plan</p>
          <h4 style={{ marginBottom: 6 }}>{plan.splitName} Split</h4>
          <p style={{ fontSize: '0.875rem' }}>{plan.splitReason}</p>
        </div>
      )}

      {/* Weekly schedule */}
      <div className="card">
        <p className="section-title">This Week</p>
        <div className="weekly-schedule">
          {DAYS.map((day, i) => {
            const scheduled = plan?.weeklySchedule?.[i]
            const isToday = i === getDayOfWeek()
            const d = new Date()
            d.setDate(d.getDate() - getDayOfWeek() + i)
            const isDone = completedDates.has(d.toDateString())

            return (
              <div
                key={day}
                className={`schedule-day ${isToday ? 'schedule-day--today' : ''} ${isDone ? 'schedule-day--done' : ''} ${scheduled?.isRest ? 'schedule-day--rest' : ''}`}
              >
                <span className="schedule-day__label">{day}</span>
                <div className="schedule-day__dot">
                  {isDone ? '✓' : scheduled?.isRest ? '·' : isToday ? '!' : ''}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Nutrition tip */}
      {tip && (
        <div className="tip-card">
          <div className="tip-card__label">Nutrition Tip</div>
          <div className="tip-card__title">{tip.icon} {tip.title}</div>
          <div className="tip-card__body">{tip.summary}</div>
          <button
            className="btn btn--ghost btn--sm"
            style={{ marginTop: 10, padding: '6px 0' }}
            onClick={() => navigate('/nutrition')}
          >
            More tips →
          </button>
        </div>
      )}
    </div>
  )
}
