# Fitness App Product Spec and Build Prompts

## Product working title
**Kofi Kinetics FitForge**

A web-hosted fitness platform that combines workout tracking, exercise education, video-led coaching, nutrition guidance, and adaptive programming into one personalized experience.

---

## 1) Product vision
Build a modern web fitness app that helps users:
- track workouts consistently
- learn the correct form for each exercise
- understand what muscles each movement trains
- access short fitness videos and guided workouts
- receive simple nutrition tips and meal guidance
- follow an intelligently tailored training plan based on goals, schedule, equipment, and experience level
- stay engaged through progress feedback, streaks, and adaptive recommendations

This should feel like a hybrid of:
- workout tracker
- exercise library
- beginner-friendly coaching platform
- personalized fitness planner
- nutrition companion

The app should be creator-friendly so the owner can continuously add workouts, videos, cues, and fitness content.

---

## 2) Product positioning
### Target users
1. **Busy beginners**
   - want structure
   - do not know what workouts to do
   - need form guidance and confidence

2. **Intermediate lifters**
   - want a clean tracker and progression system
   - want workout variations and performance insights

3. **Users with constraints**
   - home gym only
   - commercial gym only
   - limited equipment
   - 3-day, 4-day, or 5-day schedules
   - fat loss, muscle gain, recomposition, or general health goals

4. **Creator-led audience**
   - people who already follow your fitness content and want a structured system built by you

### Core promise
**Train smarter, track better, and follow a plan that adapts to you.**

---

## 3) Primary product goals
### User goals
- Know exactly what to do when they get to the gym.
- Learn how to perform exercises correctly.
- Track sets, reps, weight, tempo, rest, notes, and progression.
- Understand what each exercise trains and why it matters.
- Get personalized workouts based on goals and constraints.
- Improve consistency and confidence.
- Get practical nutrition guidance without overwhelm.

### Business goals
- Build a creator-owned fitness platform.
- Create a premium product that can later support subscriptions.
- Use content once across multiple surfaces: reels, exercise library, workouts, plans, tips.
- Create strong user retention through tracking and personalization.
- Build a scalable foundation that can later support coaching, challenges, and community.

---

## 4) Product principles
1. **Simple first** – no clutter, no confusing setup.
2. **Coach-like experience** – every screen should guide, teach, and reassure.
3. **Personalized but explainable** – recommendations should show *why* they were suggested.
4. **Content-driven** – videos, cues, and movement guidance are central.
5. **Progress over perfection** – focus on adherence, repeatability, and growth.
6. **Mobile-first web app** – should work beautifully on phone and desktop.
7. **Fast logging** – users should log workouts in seconds, not minutes.

---

## 5) MVP scope
The MVP should include the features that make the app immediately useful and differentiated.

### MVP modules
1. Authentication and onboarding
2. User profile and fitness goal setup
3. Personalized workout plan generator
4. Workout tracker
5. Exercise library with video, cues, and muscle targets
6. Nutrition tips and simple guidance
7. Progress dashboard
8. Admin content management system

---

## 6) User onboarding flow
### Onboarding questions
The app should ask users:
- What is your main goal?
  - Build muscle
  - Lose fat
  - Recomposition
  - Improve strength
  - General fitness
- Experience level
  - Beginner
  - Intermediate
  - Advanced
- Training days per week
  - 2 / 3 / 4 / 5 / 6
- Session length
  - 30 min / 45 min / 60 min / 75+ min
- Where do you train?
  - Commercial gym
  - Home gym
  - Bodyweight only
- What equipment do you have access to?
- Any injuries, pain points, or exercises to avoid?
- Preferred training style
  - Full body
  - Upper/lower
  - Push/pull/legs
  - Body part split
- Gender (optional)
- Age range (optional)
- Current weight and goal weight (optional)
- Nutrition preference
  - High protein
  - Vegetarian
  - Budget-friendly
  - Simple meals
- Skill confidence
  - Need a lot of form guidance
  - Somewhat confident
  - Confident

### Onboarding output
After onboarding, the app should generate:
- recommended training split
- weekly schedule
- starter workout plan
- personalized exercise substitutions
- suggested nutrition focus
- first-week success targets

---

## 7) Core user journeys
### Journey 1: First-time user
1. Lands on homepage
2. Signs up
3. Completes onboarding
4. Receives personalized plan
5. Starts first workout
6. Watches exercise clips and form cues
7. Logs sets/reps/weight
8. Sees progress summary after workout

### Journey 2: Returning user
1. Opens dashboard
2. Sees today’s workout
3. Continues plan
4. Logs performance quickly
5. Gets progression suggestion next session

### Journey 3: User needing substitutions
1. Opens workout
2. Selects “swap exercise”
3. Receives equivalent alternatives based on equipment, goal, and training pattern
4. Replaces movement without breaking plan logic

### Journey 4: User learning form
1. Opens exercise detail page
2. Watches short demo video
3. Reads key setup cues
4. Reads common mistakes
5. Reads what muscles are targeted
6. Saves exercise for later

---

## 8) Information architecture
### Public pages
- Landing page
- About / Brand page
- Pricing page (future-ready)
- Exercise preview pages (SEO-friendly)
- Login / Sign up

### App pages
- Dashboard
- Today’s workout
- Program / Plan overview
- Exercise library
- Exercise detail page
- Workout history
- Progress analytics
- Nutrition tips hub
- Saved content
- Profile and preferences
- Admin CMS

---

## 9) Feature specs

## 9.1 Dashboard
### Purpose
Give users a simple command center.

### Must show
- today’s workout
- weekly schedule
- current streak
- recent progress summary
- recommended nutrition tip
- incomplete tasks
- shortcuts to continue workout or browse exercises

### Nice touches
- motivational message based on progress
- “you improved on 3 lifts this week” insight
- adaptive reminder if user misses sessions

---

## 9.2 Workout tracker
### Goal
Make workout logging fast and satisfying.

### Required logging fields
- exercise name
- set number
- reps
- weight
- rest timer
- RPE or difficulty
- tempo (optional)
- notes
- completed / skipped / substituted

### Required functionality
- start workout
- live workout session screen
- add/remove sets
- duplicate previous set
- one-tap rest timer
- mark warm-up vs working sets
- auto-suggest last used weight and reps
- save workout summary
- show volume and PRs after session

### Smart features
- progression suggestion
  - increase weight
  - add 1 rep
  - maintain until form improves
- auto-deload suggestions after repeated underperformance
- detect missed exercise patterns and prompt substitutions

---

## 9.3 Exercise library
### Purpose
Teach users how to train correctly.

### Each exercise page should include
- exercise name
- primary muscles trained
- secondary muscles trained
- movement pattern
- equipment required
- difficulty level
- video demo
- step-by-step form instructions
- setup cues
- execution cues
- breathing cues
- common mistakes
- coaching tips
- range of motion guidance
- substitutions
- regressions and progressions
- contraindications or caution notes

### Example data fields
- name: Incline Dumbbell Press
- slug: incline-dumbbell-press
- category: chest
- movement_pattern: horizontal/angled press
- primary_muscles: upper chest, front delts, triceps
- equipment: dumbbells, adjustable bench
- experience: beginner/intermediate
- how_to_steps: array
- cues: array
- common_mistakes: array
- alternatives: array
- video_url
- thumbnail_url

---

## 9.4 Workout plan generator
### Purpose
Create tailored routines automatically.

### Inputs
- goal
- schedule
- equipment
- experience
- constraints
- available workout time
- preference for split
- exercises to avoid

### Output
- weekly plan
- daily workout structure
- set/rep ranges
- rest recommendations
- progression model
- substitution logic
- weekly notes

### Rules engine examples
- If goal = muscle gain and days = 4 → prefer upper/lower or push/pull split.
- If beginner and confidence low → prioritize machines and stable movements.
- If home gym only → replace cable and machine movements with dumbbell/band alternatives.
- If fat loss + 3 days/week → use full body with moderate volume and optional conditioning finisher.
- If knee pain reported → reduce deep knee flexion exercises and prioritize pain-aware alternatives.

### Personalization explanation
Each generated plan should explain:
- why this split was chosen
- why these exercises were selected
- how progression will work

---

## 9.5 Nutrition module
### Purpose
Give users practical guidance without making the app a full calorie-tracking burden at launch.

### MVP nutrition features
- daily nutrition tips
- goal-based guidance
- protein intake guidance
- hydration reminders
- pre/post workout suggestions
- simple meal ideas
- macro education content

### Nutrition content categories
- fat loss basics
- muscle gain basics
- protein 101
- meal timing
- grocery lists
- high-protein snacks
- breakfast ideas
- healthy eating on a budget

### Future nutrition upgrades
- calorie calculator
- macro calculator
- meal planner
- food logging
- barcode scan

---

## 9.6 Progress dashboard
### Purpose
Help users see improvement and stay consistent.

### Metrics to show
- workouts completed per week
- streaks
- total sets and volume
- estimated strength improvements
- body weight trend
- adherence score
- muscle group frequency
- PR history

### Visuals
- weekly completion chart
- volume by muscle group
- best lift progression chart
- consistency heatmap

### Behavioral insight examples
- “Your chest volume has increased 18% over 4 weeks.”
- “You have skipped lower body twice this week.”
- “You are most consistent on Mondays and Thursdays.”

---

## 9.7 Video system
### Requirements
- host exercise videos efficiently
- support short clips for form demos
- support guided workout videos later
- optimize for mobile playback
- show captions or cue overlays if available

### Video types
- exercise demo clips
- beginner walkthroughs
- full workout sessions
- nutrition explainer clips
- mobility and warm-up videos

### Admin controls
- upload video
- attach video to exercise
- attach video to workout
- set thumbnail
- set visibility
- tag by body part, difficulty, equipment

---

## 9.8 Admin CMS
### Purpose
Let you manage app content without editing code every time.

### Admin should be able to manage
- exercises
- workouts
- training plans
- nutrition tips
- videos
- push notifications or in-app messages
- article-style educational content

### Admin operations
- create/edit/delete exercise
- upload media
- set tags and categories
- assign alternative exercises
- publish/unpublish content
- reorder workouts in a program

---

## 10) Personalization engine spec
### Inputs
- profile data
- workout history
- adherence history
- progress rate
- skipped exercises
- preferred workout times
- available equipment

### Adaptive behaviors
- adjust weekly volume up/down
- offer substitutions for disliked exercises
- adjust difficulty if user repeatedly fails targets
- reduce complexity for beginners
- recommend more advanced progressions as users improve
- adapt rest times and exercise order for time-constrained users

### Explainability layer
The app should never feel random. Every recommendation should say things like:
- “We switched barbell back squat to goblet squat because you selected home gym access.”
- “We kept your weight the same this week because your logged difficulty was high.”
- “We increased reps instead of weight to support cleaner form progression.”

---

## 11) Gamification and retention
### MVP retention features
- streak counter
- weekly target tracker
- completion badges
- PR celebrations
- simple milestone cards

### Future features
- challenges
- referral rewards
- group accountability
- leaderboard for consistency, not ego lifting
- coach feedback or AI check-ins

---

## 12) Technical architecture recommendation
### Recommended stack
**Frontend**
- Next.js with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui component system
- React Hook Form + Zod for forms
- Recharts for analytics

**Backend / data**
- Supabase Postgres
- Supabase Auth
- Supabase Storage for videos/thumbnails
- Supabase Edge Functions for custom logic

**State / data fetching**
- TanStack Query
- Server Actions where appropriate

**Testing**
- Playwright for end-to-end tests
- Vitest for unit tests

**Deployment**
- Code hosted on GitHub
- Deploy on Vercel or Cloudflare Pages
- Custom domain later

### Why this stack
- fast to build
- strong developer ecosystem
- easy auth and database setup
- scalable enough for personalization and CMS
- easier for AI coding tools to generate reliably

### Important hosting note
If the app is only a static site, GitHub Pages can host it. But for the full product vision with authentication, video management, database-backed tracking, and tailored programs, use GitHub as the code repository and deploy the actual app on Vercel or Cloudflare Pages with Supabase powering the backend.

---

## 13) Suggested database schema

## users
- id
- email
- full_name
- avatar_url
- created_at

## profiles
- user_id
- age_range
- gender_optional
- height_optional
- weight_optional
- goal
- experience_level
- training_days_per_week
- session_length
- training_location
- equipment_access_json
- injuries_notes
- split_preference
- nutrition_preference
- form_confidence_level
- updated_at

## exercises
- id
- name
- slug
- category
- movement_pattern
- primary_muscles_json
- secondary_muscles_json
- equipment_json
- difficulty
- description
- how_to_steps_json
- setup_cues_json
- execution_cues_json
- breathing_cues_json
- common_mistakes_json
- coaching_tips_json
- contraindications_json
- thumbnail_url
- video_url
- created_at
- updated_at

## exercise_alternatives
- id
- exercise_id
- alternative_exercise_id
- reason_type

## programs
- id
- name
- description
- goal_type
- experience_level
- days_per_week
- equipment_type
- is_template
- created_by

## workouts
- id
- program_id
- day_number
- title
- description
- estimated_duration_minutes

## workout_exercises
- id
- workout_id
- exercise_id
- order_index
- prescribed_sets
- rep_range_min
- rep_range_max
- target_rpe_optional
- rest_seconds
- notes

## user_programs
- id
- user_id
- program_id
- start_date
- status
- personalization_notes_json

## workout_sessions
- id
- user_id
- workout_id
- started_at
- completed_at
- duration_seconds
- perceived_effort
- session_notes

## set_logs
- id
- workout_session_id
- exercise_id
- set_index
- reps
- weight
- rpe_optional
- tempo_optional
- rest_seconds_optional
- is_warmup
- is_completed

## body_metrics
- id
- user_id
- weight
- body_fat_optional
- waist_optional
- chest_optional
- arms_optional
- thighs_optional
- recorded_at

## nutrition_tips
- id
- title
- content
- goal_type
- tag_json
- media_url_optional
- published

## videos
- id
- title
- type
- url
- thumbnail_url
- duration_seconds
- linked_exercise_id_optional
- linked_workout_id_optional
- visibility

## saved_items
- id
- user_id
- item_type
- item_id
- created_at

---

## 14) Roles and permissions
### Roles
- guest
- member
- admin
- super_admin

### Member permissions
- view own dashboard
- log workouts
- update own preferences
- save content

### Admin permissions
- manage exercises
- manage media
- manage nutrition content
- manage plans
- view basic analytics

---

## 15) Design direction
### Brand feel
- clean
- athletic
- modern
- confident
- educational
- not bro-science

### UX notes
- mobile-first
- clear typography
- large tap targets
- sticky workout controls during active sessions
- fast search in exercise library
- visual muscle tags
- dark mode preferred

### Homepage sections
- hero section with clear value proposition
- app preview screenshots
- how it works
- key features
- testimonials placeholder
- CTA to start free

---

## 16) Non-functional requirements
- responsive on phone, tablet, desktop
- strong accessibility contrast and keyboard support
- fast initial load
- secure auth
- row-level user privacy on data
- optimized video delivery
- analytics tracking for engagement
- clear error states
- graceful empty states

---

## 17) Analytics events to track
- sign_up_completed
- onboarding_completed
- plan_generated
- workout_started
- workout_completed
- set_logged
- exercise_viewed
- video_played
- exercise_substituted
- nutrition_tip_viewed
- streak_hit
- retention_day_7
- retention_day_30

---

## 18) MVP roadmap
### Phase 1: Foundation
- landing page
- auth
- onboarding
- database schema
- dashboard shell

### Phase 2: Core experience
- exercise library
- workout tracker
- personalized plans
- history and progress pages

### Phase 3: Content layer
- videos
- nutrition hub
- admin CMS

### Phase 4: Intelligence and polish
- adaptive recommendations
- streaks and badges
- richer analytics
- AI coaching assistant

---

## 19) Product prompt for AI app builder
Use this prompt when generating the application:

**Prompt:**
Build a production-quality web fitness app called **Kofi Kinetics FitForge** using **Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase Auth, Supabase Postgres, and Supabase Storage**.

The app should be mobile-first, visually polished, and fast. It must include:
1. public landing page
2. authentication
3. onboarding flow for collecting user goals, experience level, equipment access, training frequency, time available, injuries, and nutrition preferences
4. personalized plan generator that produces a recommended weekly split and workout structure based on onboarding inputs
5. exercise library with searchable filters and exercise detail pages
6. each exercise detail page must include exercise video, muscles trained, equipment, step-by-step instructions, form cues, breathing cues, common mistakes, and exercise alternatives
7. workout tracker that allows users to start a session, log sets, reps, weight, RPE, rest, notes, and substitutions
8. progress dashboard with charts for consistency, training volume, and lift progression
9. nutrition tips hub with goal-based educational content
10. admin CMS for managing exercises, workouts, videos, and nutrition tips

The UI should feel like a premium fitness platform with a dark theme, modern cards, sticky mobile workout controls, and an educational coach-like tone.

Use a clean folder structure, server/client boundaries properly, environment variables, reusable components, and strong type safety. Add form validation with Zod, and use a scalable schema design for exercises, programs, workouts, workout_sessions, set_logs, profiles, nutrition_tips, and videos.

Implement role-based access so only admins can manage content. Use Supabase Row Level Security for user data privacy.

Create sample seed data for exercises, workouts, and nutrition tips. Include at least 20 exercises across push, pull, legs, core, and full body.

Add a dashboard experience where users immediately see today’s workout, streak, and progress summary.

---

## 20) Prompt for personalized program engine
**Prompt:**
Create a fitness program generation engine for a web app. The engine must generate personalized workout plans based on:
- primary goal
- experience level
- training days per week
- session length
- equipment availability
- injuries or limitations
- split preference
- exercise confidence level

The generator should output:
- weekly split
- workout names per day
- exercises in order
- set and rep prescriptions
- rest times
- progression strategy
- substitution options
- coaching notes explaining why the plan was chosen

Rules:
- beginners should get simpler movements, lower complexity, and more guidance
- home gym users need alternatives for machine/cable-based exercises
- users with limited time need fewer but higher-value exercises
- fat loss plans should favor adherence and efficiency
- muscle gain plans should prioritize progressive overload and adequate volume
- the engine must avoid recommending exercises listed in the user’s avoided movements or constraints

Return the plan in a structured JSON format suitable for database storage and UI rendering.

---

## 21) Prompt for exercise content generation
**Prompt:**
Generate structured exercise content for a fitness app. For each exercise return:
- name
- slug
- category
- movement pattern
- primary muscles
- secondary muscles
- equipment
- difficulty
- 5 to 7 step-by-step instructions
- setup cues
- execution cues
- breathing cues
- 5 common mistakes
- 3 coaching tips
- beginner regression
- intermediate variation
- advanced progression
- 5 alternative exercises
- safety notes

The tone should be simple, accurate, practical, and beginner-friendly. Avoid vague advice. Make the cues actionable.

---

## 22) Prompt for nutrition content engine
**Prompt:**
Generate beginner-friendly nutrition education content for a fitness app. Organize content by goal:
- muscle gain
- fat loss
- recomposition
- general health

For each tip return:
- title
- short summary
- detailed explanation
- actionable checklist
- common mistake to avoid
- suggested callout or motivational line

Keep content practical, non-extreme, and easy for busy people to follow.

---

## 23) Prompt for UI/UX generation
**Prompt:**
Design a premium mobile-first fitness web application UI with these sections:
- landing page
- onboarding wizard
- dashboard
- today’s workout page
- exercise library
- exercise detail page
- workout history
- progress analytics
- nutrition tips hub
- admin CMS

Visual style:
- dark theme
- athletic and modern
- clean spacing
- rounded cards
- clear typography
- strong hierarchy
- coach-like tone
- fast and motivating

Add sticky bottom actions on mobile for starting workouts, saving sets, and moving between exercises.

---

## 24) Prompt for GitHub-ready repo scaffold
**Prompt:**
Generate a GitHub-ready full-stack Next.js web app repository for a fitness platform. Include:
- app router structure
- TypeScript configuration
- Tailwind and shadcn setup
- Supabase integration
- protected routes
- admin role guards
- database migration files
- seed script
- reusable UI components
- example charts
- linting and formatting
- unit test setup
- Playwright end-to-end test setup
- README with local setup, environment variables, and deployment instructions

The code should be clean enough for a non-expert developer to extend.

---

## 25) Page-by-page build checklist
### Landing page
- hero
- feature highlights
- screenshots
- benefits
- CTA

### Sign up / Login
- email auth
- password auth
- forgot password

### Onboarding
- multi-step wizard
- progress bar
- save draft

### Dashboard
- today’s workout
- weekly consistency
- nutrition card
- recent history

### Today’s workout
- exercise cards
- video preview
- cues
- set logger
- rest timer
- substitutions

### Exercise detail
- demo video
- muscles trained
- instructions
- cues
- mistakes
- alternatives

### Progress
- charts
- PRs
- adherence

### Admin
- CRUD for exercises, videos, workouts, tips

---

## 26) Future premium features
- AI workout coach chat
- pose or form feedback via uploaded video
- habit tracking
- meal planner
- community groups
- coach marketplace
- wearable integration
- push notifications
- Apple Health / Google Fit sync
- Stripe subscriptions
- multilingual support

---

## 27) Recommended build order for you
1. Create landing page and auth
2. Build onboarding and profile setup
3. Build database and exercise schema
4. Seed exercise content and videos
5. Build dashboard and workout tracker
6. Build personalized plan engine
7. Add progress analytics
8. Add nutrition hub
9. Add admin CMS
10. Polish, test, deploy

---

## 28) Practical recommendation
If you are building this with no coding experience, do **not** start by trying to build the perfect AI personalization engine. Start with:
- a great exercise library
- a clean workout tracker
- simple onboarding-based plan generation rules
- strong admin content tools

That gives you a real product faster. Then you layer on smarter adaptation later.

---

## 29) Final product statement
**Kofi Kinetics FitForge** should be a creator-owned, intelligent fitness web app that helps users train with confidence, track progress with ease, and follow plans that fit their real lives.

