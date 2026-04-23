# FitForge — Build Notes

## What was built

**Kofi Kinetics FitForge** — a minimalistic, dark-themed, mobile-first fitness web app.

### Stack
| Layer | Choice | Reason |
|---|---|---|
| Framework | React 18 + Vite | JSX, fast builds, excellent DX |
| Routing | React Router v6 (HashRouter) | Works on GitHub Pages without server config |
| Styling | Pure CSS + custom properties | True minimalism, no framework overhead |
| Charts | Recharts | Lightweight, declarative, React-native |
| Data | localStorage only | No backend needed for GitHub Pages hosting |

---

## Architecture decisions

**HashRouter over BrowserRouter:** GitHub Pages is a static host. Without a server that returns `index.html` for all routes, direct URL access to `/dashboard` would 404. HashRouter uses `#/route` which always serves `index.html`.

**localStorage over Supabase:** Keeps the app fully static — no environment variables, no backend setup, works immediately after deployment. Supabase can be swapped in later by replacing the `src/utils/storage.js` functions with Supabase client calls.

**Pure CSS over Tailwind:** Fewer dependencies, smaller final bundle, full design control, easier to read and modify without knowing a utility framework.

---

## How to deploy to GitHub Pages

### First-time setup
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set Source to **Deploy from a branch**
4. Select branch: `gh-pages` / root
5. Click Save

GitHub Actions will auto-build and push to `gh-pages` on every push to `main`.

Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Local development
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Production build
```bash
npm run build
# Output in dist/
```

---

## How to add new exercises

Edit `src/data/exercises.js` and add an object following this schema:

```js
{
  id: 'ex-026',               // unique, increment
  name: 'Exercise Name',
  slug: 'exercise-name',      // URL-safe, kebab-case
  category: 'chest',          // chest | back | shoulders | arms | legs | core
  movement_pattern: '...',
  primary_muscles: ['...'],
  secondary_muscles: ['...'],
  equipment: ['barbell'],     // empty array = bodyweight
  difficulty: 'beginner',     // beginner | intermediate | advanced
  location: ['commercial'],   // commercial | home | bodyweight
  emoji: '💪',
  instructions: ['Step 1...', 'Step 2...'],
  setup_cues: ['Cue 1...'],
  execution_cues: ['Cue 1...'],
  breathing_cue: 'Exhale as you...',
  common_mistakes: ['Mistake 1...'],
  coaching_tip: 'One coaching tip.',
  alternatives: ['other-exercise-slug'],
  video_url: null,            // or 'https://...' when available
}
```

The exercise will automatically appear in the library, detail pages, and plan generator.

---

## How to customise the plan generator

Edit `src/utils/planGenerator.js`:

- **Split rules** — modify `selectSplit()` to change which split is recommended for which day count.
- **Set/rep ranges** — modify `getSetsReps()` per goal and experience level.
- **Equipment filtering** — modify `getEligibleExercises()` to adjust which exercises are excluded for each location.

---

## How to add nutrition tips

Edit `src/data/nutrition.js` and add an object:

```js
{
  id: 'n-016',
  title: 'Tip Title',
  icon: '🥗',
  summary: 'One-line hook.',
  detail: 'Full explanation paragraph.',
  checklist: ['Action item 1', 'Action item 2'],
  goal: ['muscle_gain', 'fat_loss', 'recomposition', 'general'],
  tag: 'Protein 101',  // used for filter chips
}
```

---

## Future upgrades

### Adding Supabase (auth + database)
1. Create a Supabase project at supabase.com
2. Replace functions in `src/utils/storage.js` with `@supabase/supabase-js` client calls
3. Add environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Add to `.github/workflows/deploy.yml` as GitHub secrets

### Adding video support
- Add `video_url` to exercises in `exercises.js`
- Update `ExerciseDetail.jsx` to render a `<video>` or YouTube iframe instead of the placeholder

### Adding a backend API
- The localStorage data model maps 1:1 to the database schema in the original spec
- Each localStorage key corresponds to a database table

---

## File structure

```
src/
├── main.jsx              Entry point
├── App.jsx               Router + route guards
├── index.css             Full design system
├── data/
│   ├── exercises.js      25 exercises with full metadata
│   └── nutrition.js      15 nutrition tips
├── utils/
│   ├── storage.js        localStorage helpers + analytics
│   └── planGenerator.js  Rules-based plan engine
├── components/
│   ├── Layout.jsx        App shell (top bar + nav)
│   ├── BottomNav.jsx     Mobile bottom navigation
│   ├── SetRow.jsx        Single set logging row
│   └── RestTimer.jsx     Countdown rest timer overlay
└── pages/
    ├── Landing.jsx        Public homepage
    ├── Onboarding.jsx     5-step setup wizard
    ├── Dashboard.jsx      Command centre
    ├── Workout.jsx        Active workout session
    ├── ExerciseLibrary.jsx Search + filter exercises
    ├── ExerciseDetail.jsx  Full exercise info (tabs)
    ├── Progress.jsx       Charts + heatmap + top lifts
    └── Nutrition.jsx      Goal-based tips hub
```
