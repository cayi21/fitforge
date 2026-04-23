export default function SetRow({ setNum, prevData, set, onChange, onCheck }) {
  const prevText = prevData ? `${prevData.weight}kg × ${prevData.reps}` : '—'

  return (
    <div className={`set-row ${set.completed ? 'set-row--done' : ''}`}>
      <span className="set-row__num">{setNum}</span>
      <span className="set-row__prev">{prevText}</span>
      <input
        className="input input--sm input--number"
        type="number"
        min="0"
        step="0.5"
        placeholder="kg"
        value={set.weight}
        onChange={e => onChange({ ...set, weight: e.target.value })}
        aria-label={`Weight for set ${setNum}`}
      />
      <input
        className="input input--sm input--number"
        type="number"
        min="0"
        placeholder="reps"
        value={set.reps}
        onChange={e => onChange({ ...set, reps: e.target.value })}
        aria-label={`Reps for set ${setNum}`}
      />
      <button
        className={`set-row__check ${set.completed ? 'set-row__check--done' : ''}`}
        onClick={onCheck}
        aria-label={set.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {set.completed ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : null}
      </button>
    </div>
  )
}
