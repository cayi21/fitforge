import { useState } from 'react'
import { getProfile } from '../utils/storage'
import { getTipsForGoal } from '../data/nutrition'

const GOAL_LABELS = {
  build_muscle: 'Build Muscle',
  lose_fat: 'Lose Fat',
  recomposition: 'Recomposition',
  strength: 'Build Strength',
  general_fitness: 'General Fitness',
}

const GOAL_SUBTITLES = {
  build_muscle: 'Tips focused on fuelling muscle growth and recovery.',
  lose_fat: 'Practical guidance for sustainable fat loss without losing muscle.',
  recomposition: 'How to eat to lose fat and build muscle at the same time.',
  strength: 'Nutrition for performance, power, and strength gains.',
  general_fitness: 'Balanced nutrition for overall health and energy.',
}

const TAG_FILTERS = ['All', 'Protein 101', 'Meal Timing', 'Hydration', 'Budget Eating', 'Recovery', 'Macro Education']

export default function Nutrition() {
  const profile = getProfile()
  const goal = profile?.goal
  const goalTips = getTipsForGoal(goal)

  const [expanded, setExpanded] = useState(null)
  const [tagFilter, setTagFilter] = useState('All')

  const displayTips = tagFilter === 'All'
    ? goalTips
    : goalTips.filter(t => t.tag === tagFilter)

  function toggle(id) {
    setExpanded(prev => prev === id ? null : id)
  }

  return (
    <div className="section stack stack--lg">
      <h2 style={{ paddingTop: 8 }}>Nutrition</h2>

      {/* Goal banner */}
      {goal && (
        <div className="goal-banner">
          <div className="goal-banner__label">Your Goal</div>
          <h3>{GOAL_LABELS[goal] || 'General Fitness'}</h3>
          <p style={{ marginTop: 4, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            {GOAL_SUBTITLES[goal] || ''}
          </p>
        </div>
      )}

      {/* Tag filters */}
      <div className="chip-row">
        {TAG_FILTERS.map(tag => (
          <button
            key={tag}
            className={`chip ${tagFilter === tag ? 'chip--active' : ''}`}
            onClick={() => setTagFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-muted text-sm">{displayTips.length} tip{displayTips.length !== 1 ? 's' : ''}</p>

      {/* Tips */}
      <div className="stack stack--sm">
        {displayTips.map(tip => (
          <div key={tip.id} className="tip-expand-card">
            <button
              className="tip-expand-card__header"
              onClick={() => toggle(tip.id)}
              aria-expanded={expanded === tip.id}
            >
              <span className="tip-expand-card__icon">{tip.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div className="tip-expand-card__title">{tip.title}</div>
                <div className="tip-expand-card__summary">{tip.summary}</div>
              </div>
              <svg
                className={`tip-expand-card__chevron ${expanded === tip.id ? 'tip-expand-card__chevron--open' : ''}`}
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {expanded === tip.id && (
              <div className="tip-expand-card__body">
                <p className="tip-expand-card__detail">{tip.detail}</p>
                {tip.checklist.length > 0 && (
                  <div className="checklist">
                    {tip.checklist.map((item, i) => (
                      <div key={i} className="checklist-item">{item}</div>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: 14 }}>
                  <span className="tag">{tip.tag}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {displayTips.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">🥗</div>
          <h3>No tips for this filter</h3>
          <button className="btn btn--secondary btn--sm" style={{ marginTop: 12 }} onClick={() => setTagFilter('All')}>
            Show all tips
          </button>
        </div>
      )}
    </div>
  )
}
