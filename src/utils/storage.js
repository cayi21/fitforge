const KEYS = {
  PROFILE: 'fitforge_profile',
  PLAN: 'fitforge_plan',
  SESSIONS: 'fitforge_sessions',
  BODY_METRICS: 'fitforge_body_metrics',
  STREAK: 'fitforge_streak',
  ACTIVE_SESSION: 'fitforge_active_session',
}

function read(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable
  }
}

// ── Profile ─────────────────────────────────────────────────────
export function getProfile() {
  return read(KEYS.PROFILE)
}

export function saveProfile(profile) {
  write(KEYS.PROFILE, profile)
}

export function clearAll() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k))
}

// ── Plan ─────────────────────────────────────────────────────────
export function getPlan() {
  return read(KEYS.PLAN)
}

export function savePlan(plan) {
  write(KEYS.PLAN, plan)
}

// ── Sessions ─────────────────────────────────────────────────────
export function getSessions() {
  return read(KEYS.SESSIONS) || []
}

export function addSession(session) {
  const sessions = getSessions()
  sessions.unshift({ ...session, id: Date.now().toString() })
  write(KEYS.SESSIONS, sessions)
  return sessions[0]
}

export function getRecentSessions(n = 10) {
  return getSessions().slice(0, n)
}

export function getLastSessionForWorkout(workoutName) {
  return getSessions().find(s => s.workoutName === workoutName) || null
}

export function getLastSetForExercise(exerciseId) {
  const sessions = getSessions()
  for (const session of sessions) {
    const ex = session.exercises?.find(e => e.id === exerciseId)
    if (ex && ex.sets?.length) {
      return ex.sets.filter(s => s.completed)
    }
  }
  return []
}

// ── Streak ───────────────────────────────────────────────────────
export function getStreak() {
  return read(KEYS.STREAK) || { current: 0, best: 0, lastWorkoutDate: null }
}

export function updateStreak() {
  const today = new Date().toDateString()
  const streak = getStreak()

  if (streak.lastWorkoutDate === today) return streak

  const yesterday = new Date(Date.now() - 86400000).toDateString()
  const newCurrent = streak.lastWorkoutDate === yesterday ? streak.current + 1 : 1
  const updated = {
    current: newCurrent,
    best: Math.max(newCurrent, streak.best),
    lastWorkoutDate: today,
  }
  write(KEYS.STREAK, updated)
  return updated
}

// ── Body metrics ─────────────────────────────────────────────────
export function getBodyMetrics() {
  return read(KEYS.BODY_METRICS) || []
}

export function addBodyMetric(weight) {
  const metrics = getBodyMetrics()
  const date = new Date().toISOString().split('T')[0]
  const existing = metrics.findIndex(m => m.date === date)
  if (existing >= 0) {
    metrics[existing] = { weight, date }
  } else {
    metrics.unshift({ weight, date })
  }
  write(KEYS.BODY_METRICS, metrics.slice(0, 365))
}

// ── Active session ────────────────────────────────────────────────
export function getActiveSession() {
  return read(KEYS.ACTIVE_SESSION)
}

export function saveActiveSession(session) {
  write(KEYS.ACTIVE_SESSION, session)
}

export function clearActiveSession() {
  localStorage.removeItem(KEYS.ACTIVE_SESSION)
}

// ── Analytics helpers ─────────────────────────────────────────────
export function getWeeklyCompletions(weeks = 8) {
  const sessions = getSessions()
  const result = []
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
    weekStart.setHours(0, 0, 0, 0)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    const count = sessions.filter(s => {
      const d = new Date(s.date)
      return d >= weekStart && d < weekEnd && s.completed
    }).length
    const label = `W${weeks - i}`
    result.push({ week: label, workouts: count })
  }
  return result
}

export function getWeeklyVolume(weeks = 8) {
  const sessions = getSessions()
  const result = []
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7)
    weekStart.setHours(0, 0, 0, 0)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    const volume = sessions
      .filter(s => {
        const d = new Date(s.date)
        return d >= weekStart && d < weekEnd && s.completed
      })
      .reduce((sum, s) => {
        const sv = (s.exercises || []).reduce((es, ex) => {
          return es + (ex.sets || []).filter(set => set.completed).reduce((ss, set) => {
            return ss + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0)
          }, 0)
        }, 0)
        return sum + sv
      }, 0)
    result.push({ week: `W${weeks - i}`, volume: Math.round(volume) })
  }
  return result
}

export function getTopLifts() {
  const sessions = getSessions()
  const bests = {}
  for (const session of sessions) {
    for (const ex of session.exercises || []) {
      for (const set of ex.sets || []) {
        if (!set.completed || !set.weight) continue
        const w = parseFloat(set.weight)
        if (!bests[ex.id] || w > bests[ex.id].weight) {
          bests[ex.id] = { exerciseId: ex.id, exerciseName: ex.name, weight: w, date: session.date }
        }
      }
    }
  }
  return Object.values(bests).sort((a, b) => b.weight - a.weight).slice(0, 8)
}

export function getHeatmapData(days = 56) {
  const sessions = getSessions()
  const completedDates = new Set(sessions.filter(s => s.completed).map(s => new Date(s.date).toDateString()))
  const result = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    result.push({
      date: d.toDateString(),
      done: completedDates.has(d.toDateString()),
      isToday: i === 0,
    })
  }
  return result
}

export function getTotalStats() {
  const sessions = getSessions().filter(s => s.completed)
  const totalVolume = sessions.reduce((sum, s) => {
    return sum + (s.exercises || []).reduce((es, ex) => {
      return es + (ex.sets || []).filter(set => set.completed).reduce((ss, set) => {
        return ss + (parseFloat(set.weight) || 0) * (parseInt(set.reps) || 0)
      }, 0)
    }, 0)
  }, 0)
  return {
    totalSessions: sessions.length,
    totalVolume: Math.round(totalVolume),
  }
}
