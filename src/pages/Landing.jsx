import { useNavigate } from 'react-router-dom'
import { getProfile } from '../utils/storage'
import { useEffect } from 'react'

const features = [
  {
    icon: '📋',
    title: 'Personalised Plans',
    desc: 'Answer a few questions and get a tailored programme built around your goals, schedule, and available equipment.',
  },
  {
    icon: '⚡',
    title: 'Fast Workout Logging',
    desc: 'Log sets, reps, and weight in seconds. Auto-fill from your last session. Rest timer built in.',
  },
  {
    icon: '📚',
    title: 'Exercise Library',
    desc: '25+ exercises with step-by-step instructions, form cues, common mistakes, and substitutions.',
  },
  {
    icon: '📈',
    title: 'Progress Tracking',
    desc: 'See your strength trends, consistency heatmap, and volume over time. Know exactly how you\'re improving.',
  },
  {
    icon: '🥗',
    title: 'Nutrition Guidance',
    desc: 'Practical, goal-specific nutrition tips. No calorie counting required — just actionable advice.',
  },
  {
    icon: '🔥',
    title: 'Streak System',
    desc: 'Build training habits with streak tracking. Consistency beats intensity every time.',
  },
]

const steps = [
  {
    num: '1',
    title: 'Tell us about yourself',
    desc: 'Share your goal, experience level, schedule, and equipment in a quick 5-step setup.',
  },
  {
    num: '2',
    title: 'Get your personalised plan',
    desc: 'We generate a weekly programme built specifically for you, with exercise explanations included.',
  },
  {
    num: '3',
    title: 'Train, log, improve',
    desc: 'Follow your plan, log your sessions, and watch your progress grow week by week.',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const profile = getProfile()
    if (profile?.onboardingComplete) navigate('/dashboard', { replace: true })
  }, [navigate])

  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="landing-nav__brand">Fit<span>Forge</span></span>
        <div style={{ flex: 1 }} />
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('/onboarding')}>
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <span className="hero__eyebrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
          Kofi Kinetics FitForge
        </span>
        <h1 className="hero__title fade-up">
          Train smarter.<br />
          Track <em>better</em>.<br />
          Follow your plan.
        </h1>
        <p className="hero__sub fade-up">
          A personal fitness platform that gives you a tailored workout programme,
          teaches you correct form, and tracks your progress — all in one place.
        </p>
        <div className="hero__cta fade-up">
          <button className="btn btn--primary btn--lg" onClick={() => navigate('/onboarding')}>
            Start for free →
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)' }}>
        <div style={{ textAlign: 'center', padding: '0 24px 48px' }}>
          <h2>Everything you need to train with confidence</h2>
          <p style={{ maxWidth: '440px', margin: '12px auto 0' }}>No fluff, no confusion. Just the tools that actually move the needle.</p>
        </div>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p style={{ marginTop: 8, fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <div className="how-it-works">
        <h2>How it works</h2>
        <p style={{ marginTop: 8 }}>Three steps and you\'re training.</p>
        <div className="steps">
          {steps.map(s => (
            <div key={s.num} className="step">
              <div className="step__num">{s.num}</div>
              <div>
                <h4>{s.title}</h4>
                <p style={{ marginTop: 4, fontSize: '0.9rem' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn--primary btn--lg btn--full"
          style={{ marginTop: 40 }}
          onClick={() => navigate('/onboarding')}
        >
          Build my plan →
        </button>
      </div>

      <footer className="landing-footer">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          © 2025 Kofi Kinetics FitForge. Train smarter.
        </p>
      </footer>
    </div>
  )
}
