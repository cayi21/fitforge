const CDN = 'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0'

// Maps exercise slug → animated GIF URL (jsDelivr CDN, no API key needed)
export const exerciseGifs = {
  // ── Chest ────────────────────────────────────────────────────
  'barbell-bench-press':       `${CDN}/pectorals/barbell-bench-press.gif`,
  'incline-dumbbell-press':    `${CDN}/pectorals/dumbbell-incline-bench-press.gif`,
  'push-up':                   `${CDN}/pectorals/push-up.gif`,
  'cable-fly':                 `${CDN}/pectorals/cable-middle-fly.gif`,
  'dips':                      `${CDN}/pectorals/chest-dip.gif`,

  // ── Back ─────────────────────────────────────────────────────
  'pull-up':                   `${CDN}/lats/pull-up.gif`,
  'barbell-row':               `${CDN}/lats/barbell-bent-over-row.gif`,
  'lat-pulldown':              `${CDN}/lats/lat-pulldown.gif`,
  'seated-cable-row':          `${CDN}/lats/seated-cable-row.gif`,
  'face-pull':                 `${CDN}/upper-back/face-pull.gif`,

  // ── Shoulders ────────────────────────────────────────────────
  'overhead-press':            `${CDN}/delts/barbell-shoulder-press.gif`,
  'lateral-raise':             `${CDN}/delts/dumbbell-lateral-raise.gif`,
  'rear-delt-fly':             `${CDN}/delts/cable-rear-delt-fly.gif`,

  // ── Arms ─────────────────────────────────────────────────────
  'barbell-bicep-curl':        `${CDN}/biceps/barbell-curl.gif`,
  'hammer-curl':               `${CDN}/biceps/hammer-curl.gif`,
  'tricep-pushdown':           `${CDN}/triceps/tricep-pushdown.gif`,
  'overhead-tricep-extension': `${CDN}/triceps/overhead-tricep-extension.gif`,

  // ── Legs ─────────────────────────────────────────────────────
  'barbell-back-squat':        `${CDN}/quads/barbell-squat.gif`,
  'romanian-deadlift':         `${CDN}/hamstrings/romanian-deadlift.gif`,
  'leg-press':                 `${CDN}/quads/leg-press.gif`,
  'bulgarian-split-squat':     `${CDN}/quads/bulgarian-split-squat.gif`,
  'leg-curl':                  `${CDN}/hamstrings/leg-curl.gif`,
  'hip-thrust':                `${CDN}/glutes/hip-thrust.gif`,

  // ── Core ─────────────────────────────────────────────────────
  'plank':                     `${CDN}/abs/plank.gif`,
  'dead-bug':                  `${CDN}/abs/dead-bug.gif`,
}

// Fallback still images from public-domain free-exercise-db (yuhonas/free-exercise-db)
const STILL_CDN = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

export const exerciseImages = {
  'barbell-bench-press':       `${STILL_CDN}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
  'incline-dumbbell-press':    `${STILL_CDN}/Incline_Dumbbell_Press/0.jpg`,
  'push-up':                   `${STILL_CDN}/Pushups/0.jpg`,
  'pull-up':                   `${STILL_CDN}/Pull-ups/0.jpg`,
  'barbell-row':               `${STILL_CDN}/Barbell_Row/0.jpg`,
  'lat-pulldown':              `${STILL_CDN}/Lat_Pulldown/0.jpg`,
  'overhead-press':            `${STILL_CDN}/Barbell_Shoulder_Press/0.jpg`,
  'barbell-bicep-curl':        `${STILL_CDN}/Barbell_Curl/0.jpg`,
  'barbell-back-squat':        `${STILL_CDN}/Barbell_Squat/0.jpg`,
  'romanian-deadlift':         `${STILL_CDN}/Romanian_Deadlift/0.jpg`,
  'leg-press':                 `${STILL_CDN}/Leg_Press/0.jpg`,
  'plank':                     `${STILL_CDN}/Plank/0.jpg`,
}

export function getGif(slug) {
  return exerciseGifs[slug] || null
}

export function getImage(slug) {
  return exerciseImages[slug] || null
}
