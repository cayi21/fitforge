import { exercises } from '../data/exercises'

const SPLITS = {
  full_body: {
    name: 'Full Body',
    days: ['Full Body A', 'Full Body B', 'Full Body C'],
    reason: 'A full body split is ideal for your schedule — you\'ll hit each muscle group multiple times per week, which maximises growth and consistency.',
  },
  upper_lower: {
    name: 'Upper / Lower',
    days: ['Upper A', 'Lower A', 'Upper B', 'Lower B'],
    reason: 'An upper/lower split is perfect for 4 training days — you\'ll hit each muscle group twice a week with enough recovery between sessions.',
  },
  ppl: {
    name: 'Push / Pull / Legs',
    days: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs'],
    reason: 'A Push/Pull/Legs split is excellent for 5–6 days of training — high volume per session and optimal recovery between muscle groups.',
  },
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function selectSplit(profile) {
  const days = profile.daysPerWeek
  if (profile.split && profile.split !== 'recommended') {
    if (profile.split === 'full_body') return SPLITS.full_body
    if (profile.split === 'upper_lower') return SPLITS.upper_lower
    if (profile.split === 'ppl') return SPLITS.ppl
  }
  if (days <= 3) return SPLITS.full_body
  if (days === 4) return SPLITS.upper_lower
  return SPLITS.ppl
}

function getSetsReps(goal, experience) {
  const configs = {
    build_muscle: { sets: experience === 'beginner' ? 3 : 4, repMin: 8, repMax: 12, rest: 90 },
    lose_fat: { sets: 3, repMin: 12, repMax: 15, rest: 60 },
    recomposition: { sets: 3, repMin: 10, repMax: 12, rest: 75 },
    strength: { sets: experience === 'advanced' ? 5 : 4, repMin: 3, repMax: 6, rest: 180 },
    general_fitness: { sets: 3, repMin: 10, repMax: 12, rest: 75 },
  }
  return configs[goal] || configs.general_fitness
}

function getEligibleExercises(profile) {
  return exercises.filter(ex => {
    if (profile.location === 'bodyweight' && ex.equipment.length > 0) return false
    if (profile.location === 'home') {
      const machineBased = ex.equipment.some(e => e.includes('cable') || e.includes('machine') || e.includes('rack'))
      if (machineBased) return false
    }
    if (profile.experience === 'beginner' && ex.difficulty === 'advanced') return false
    return true
  })
}

function pickExercises(eligible, categories, count) {
  const result = []
  const pool = [...eligible]
  const catCounts = {}

  for (const cat of categories) {
    const available = pool.filter(e => e.category === cat && !result.includes(e))
    if (available.length > 0) {
      const pick = available[Math.floor(Math.random() * available.length)]
      result.push(pick)
      catCounts[cat] = (catCounts[cat] || 0) + 1
    }
  }

  while (result.length < count) {
    const remaining = pool.filter(e => !result.includes(e))
    if (!remaining.length) break
    result.push(remaining[Math.floor(Math.random() * remaining.length)])
  }

  return result.slice(0, count)
}

function buildFullBodyWorkout(eligible, label, setsReps, sessionLength) {
  const exerciseCount = sessionLength <= 30 ? 4 : sessionLength <= 45 ? 5 : 6
  const categories = ['legs', 'chest', 'back', 'shoulders', 'arms', 'core']
  const picked = pickExercises(eligible, categories, exerciseCount)
  return {
    name: label,
    exercises: picked.map(ex => ({
      id: ex.id,
      name: ex.name,
      slug: ex.slug,
      category: ex.category,
      sets: setsReps.sets,
      repMin: setsReps.repMin,
      repMax: setsReps.repMax,
      rest: setsReps.rest,
    })),
  }
}

function buildUpperWorkout(eligible, label, setsReps, sessionLength) {
  const count = sessionLength <= 45 ? 5 : 6
  const categories = ['chest', 'back', 'shoulders', 'arms', 'arms']
  const picked = pickExercises(eligible.filter(e => ['chest', 'back', 'shoulders', 'arms'].includes(e.category)), categories, count)
  return {
    name: label,
    exercises: picked.map(ex => ({
      id: ex.id, name: ex.name, slug: ex.slug, category: ex.category,
      sets: setsReps.sets, repMin: setsReps.repMin, repMax: setsReps.repMax, rest: setsReps.rest,
    })),
  }
}

function buildLowerWorkout(eligible, label, setsReps, sessionLength) {
  const count = sessionLength <= 45 ? 4 : 5
  const categories = ['legs', 'legs', 'legs', 'core', 'core']
  const picked = pickExercises(eligible.filter(e => ['legs', 'core'].includes(e.category)), categories, count)
  return {
    name: label,
    exercises: picked.map(ex => ({
      id: ex.id, name: ex.name, slug: ex.slug, category: ex.category,
      sets: setsReps.sets, repMin: setsReps.repMin, repMax: setsReps.repMax, rest: setsReps.rest,
    })),
  }
}

function buildPushWorkout(eligible, label, setsReps) {
  const categories = ['chest', 'chest', 'shoulders', 'shoulders', 'arms']
  const picked = pickExercises(eligible.filter(e => ['chest', 'shoulders', 'arms'].includes(e.category)), categories, 5)
  return {
    name: label,
    exercises: picked.map(ex => ({
      id: ex.id, name: ex.name, slug: ex.slug, category: ex.category,
      sets: setsReps.sets, repMin: setsReps.repMin, repMax: setsReps.repMax, rest: setsReps.rest,
    })),
  }
}

function buildPullWorkout(eligible, label, setsReps) {
  const categories = ['back', 'back', 'back', 'shoulders', 'arms']
  const picked = pickExercises(eligible.filter(e => ['back', 'arms'].includes(e.category)), categories, 5)
  return {
    name: label,
    exercises: picked.map(ex => ({
      id: ex.id, name: ex.name, slug: ex.slug, category: ex.category,
      sets: setsReps.sets, repMin: setsReps.repMin, repMax: setsReps.repMax, rest: setsReps.rest,
    })),
  }
}

function buildLegsWorkout(eligible, label, setsReps) {
  const categories = ['legs', 'legs', 'legs', 'core', 'core']
  const picked = pickExercises(eligible.filter(e => ['legs', 'core'].includes(e.category)), categories, 5)
  return {
    name: label,
    exercises: picked.map(ex => ({
      id: ex.id, name: ex.name, slug: ex.slug, category: ex.category,
      sets: setsReps.sets, repMin: setsReps.repMin, repMax: setsReps.repMax, rest: setsReps.rest,
    })),
  }
}

export function generatePlan(profile) {
  const split = selectSplit(profile)
  const setsReps = getSetsReps(profile.goal, profile.experience)
  const eligible = getEligibleExercises(profile)
  const days = profile.daysPerWeek || 3
  const sessionLength = parseInt(profile.sessionLength) || 45

  const workoutDefs = []
  const splitType = split.name

  if (splitType === 'Full Body') {
    const templates = [
      buildFullBodyWorkout(eligible, 'Full Body A', setsReps, sessionLength),
      buildFullBodyWorkout(eligible, 'Full Body B', setsReps, sessionLength),
      buildFullBodyWorkout(eligible, 'Full Body C', setsReps, sessionLength),
    ]
    for (let i = 0; i < days; i++) {
      workoutDefs.push(templates[i % templates.length])
    }
  } else if (splitType === 'Upper / Lower') {
    const templates = [
      buildUpperWorkout(eligible, 'Upper A', setsReps, sessionLength),
      buildLowerWorkout(eligible, 'Lower A', setsReps, sessionLength),
      buildUpperWorkout(eligible, 'Upper B', setsReps, sessionLength),
      buildLowerWorkout(eligible, 'Lower B', setsReps, sessionLength),
    ]
    for (let i = 0; i < days; i++) {
      workoutDefs.push(templates[i % templates.length])
    }
  } else {
    const templates = [
      buildPushWorkout(eligible, 'Push', setsReps),
      buildPullWorkout(eligible, 'Pull', setsReps),
      buildLegsWorkout(eligible, 'Legs', setsReps),
    ]
    for (let i = 0; i < days; i++) {
      workoutDefs.push(templates[i % templates.length])
    }
  }

  // Assign to weekly schedule — spread training days with rest days
  const trainingDayIndices = spreadDays(days)
  const weeklySchedule = DAYS_OF_WEEK.map((day, i) => {
    const workoutIndex = trainingDayIndices.indexOf(i)
    if (workoutIndex === -1) {
      return { day, dayIndex: i, isRest: true, workout: null }
    }
    return { day, dayIndex: i, isRest: false, workout: workoutDefs[workoutIndex] }
  })

  return {
    splitName: split.name,
    splitReason: split.reason,
    setsReps,
    weeklySchedule,
    generatedAt: new Date().toISOString(),
  }
}

function spreadDays(count) {
  const all = [0, 1, 2, 3, 4, 5, 6]
  if (count >= 7) return all
  if (count === 1) return [1]
  if (count === 2) return [1, 4]
  if (count === 3) return [1, 3, 5]
  if (count === 4) return [1, 2, 4, 5]
  if (count === 5) return [1, 2, 3, 4, 5]
  if (count === 6) return [0, 1, 2, 3, 4, 5]
  return [0, 1, 2, 3, 4, 5, 6]
}

export function getTodaysWorkout(plan) {
  if (!plan?.weeklySchedule) return null
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  const today = plan.weeklySchedule[todayIndex]
  if (!today || today.isRest) {
    const upcoming = plan.weeklySchedule.find((d, i) => i > todayIndex && !d.isRest)
    return upcoming || plan.weeklySchedule.find(d => !d.isRest) || null
  }
  return today
}
