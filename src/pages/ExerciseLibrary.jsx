import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { filterExercises } from '../data/exercises'

const CATEGORIES = ['all', 'chest', 'back', 'shoulders', 'arms', 'legs', 'core']
const EQUIPMENT = ['all', 'barbell', 'dumbbell', 'cable', 'machine', 'bodyweight']

const CATEGORY_EMOJIS = {
  chest: '🫁', back: '🔙', shoulders: '🙌', arms: '💪', legs: '🦵', core: '⚡',
}

const DIFFICULTY_COLORS = {
  beginner: 'badge--success',
  intermediate: 'badge--warning',
  advanced: 'badge--accent',
}

export default function ExerciseLibrary() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [equipment, setEquipment] = useState('all')

  const filtered = filterExercises({ category, equipment, search })

  return (
    <div className="section stack stack--md">
      <h2 style={{ paddingTop: 8 }}>Exercise Library</h2>

      {/* Search */}
      <div className="search-bar">
        <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="input"
          type="search"
          placeholder="Search exercises..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search exercises"
        />
      </div>

      {/* Category filter */}
      <div className="chip-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`chip ${category === cat ? 'chip--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'All' : `${CATEGORY_EMOJIS[cat] || ''} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Equipment filter */}
      <div className="chip-row">
        {EQUIPMENT.map(eq => (
          <button
            key={eq}
            className={`chip ${equipment === eq ? 'chip--active' : ''}`}
            onClick={() => setEquipment(eq)}
          >
            {eq === 'all' ? 'All Equipment' : eq.charAt(0).toUpperCase() + eq.slice(1)}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-muted text-sm">{filtered.length} exercise{filtered.length !== 1 ? 's' : ''}</p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="exercise-grid">
          {filtered.map(ex => (
            <button
              key={ex.id}
              className="exercise-thumb"
              onClick={() => navigate(`/exercises/${ex.slug}`)}
              aria-label={`View ${ex.name}`}
            >
              <div className="exercise-thumb__img">{ex.emoji}</div>
              <div className="exercise-thumb__body">
                <div className="exercise-thumb__name">{ex.name}</div>
                <div className="exercise-thumb__meta">
                  <span className={`badge ${DIFFICULTY_COLORS[ex.difficulty]}`}>{ex.difficulty}</span>
                  <span className="badge badge--muted">{ex.category}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <h3>No exercises found</h3>
          <p>Try adjusting your search or filters.</p>
          <button className="btn btn--secondary btn--sm" style={{ marginTop: 16 }} onClick={() => { setSearch(''); setCategory('all'); setEquipment('all') }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
