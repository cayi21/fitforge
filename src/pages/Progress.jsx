import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import {
  getWeeklyCompletions, getWeeklyVolume, getTopLifts,
  getHeatmapData, getSessions, addBodyMetric, getBodyMetrics, getStreak,
} from '../utils/storage'

export default function Progress() {
  const sessions = getSessions().filter(s => s.completed)
  const weeklyCompletions = getWeeklyCompletions()
  const weeklyVolume = getWeeklyVolume()
  const topLifts = getTopLifts()
  const heatmap = getHeatmapData()
  const streak = getStreak()
  const bodyMetrics = getBodyMetrics().slice(0, 30)

  const [weightInput, setWeightInput] = useState('')
  const [logged, setLogged] = useState(false)

  function logWeight() {
    const w = parseFloat(weightInput)
    if (isNaN(w) || w <= 0) return
    addBodyMetric(w)
    setWeightInput('')
    setLogged(true)
    setTimeout(() => setLogged(false), 3000)
  }

  const hasData = sessions.length > 0

  const weightChartData = [...bodyMetrics].reverse().map(m => ({ date: m.date.slice(5), weight: m.weight }))

  return (
    <div className="section stack stack--lg">
      <h2 style={{ paddingTop: 8 }}>Progress</h2>

      {/* Streak summary */}
      <div className="streak-card">
        <span className="streak-card__flame">🔥</span>
        <div>
          <div className="streak-card__count">{streak?.current || 0}</div>
          <div className="streak-card__label">Day streak · Best: {streak?.best || 0}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{sessions.length}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Total sessions</div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card">
        <h3 style={{ marginBottom: 4 }}>Consistency</h3>
        <p style={{ marginBottom: 16, fontSize: '0.875rem' }}>Last 56 days</p>
        <div className="heatmap">
          {heatmap.map((cell, i) => (
            <div
              key={i}
              className={`heatmap-cell ${cell.done ? 'heatmap-cell--done' : ''} ${cell.isToday ? 'heatmap-cell--today' : ''}`}
              title={cell.date}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--bg-elevated)', display: 'inline-block' }} />
            Rest
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(249,115,22,0.6)', display: 'inline-block' }} />
            Trained
          </span>
        </div>
      </div>

      {!hasData ? (
        <div className="empty-state">
          <div className="empty-state__icon">📊</div>
          <h3>No data yet</h3>
          <p>Complete your first workout to see your progress charts here.</p>
        </div>
      ) : (
        <>
          {/* Weekly workouts chart */}
          <div className="chart-card">
            <h3>Workouts Per Week</h3>
            <p>Your training frequency over the last 8 weeks.</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyCompletions} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="workouts" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Volume chart */}
          <div className="chart-card">
            <h3>Weekly Volume</h3>
            <p>Total weight lifted (kg) per week.</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyVolume} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Line type="monotone" dataKey="volume" stroke="var(--accent)" strokeWidth={2} dot={{ r: 3, fill: 'var(--accent)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top lifts */}
          {topLifts.length > 0 && (
            <div className="card">
              <h3 style={{ marginBottom: 16 }}>Top Lifts</h3>
              {topLifts.map((lift, i) => (
                <div key={i} className="lift-row">
                  <span className="lift-row__name">{lift.exerciseName}</span>
                  <span>
                    <span className="lift-row__weight">{lift.weight}</span>
                    <span className="lift-row__unit">kg</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Body weight log */}
      <div className="card">
        <h3 style={{ marginBottom: 4 }}>Body Weight</h3>
        <p style={{ marginBottom: 16, fontSize: '0.875rem' }}>Log your weight to track body composition changes.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="input"
            type="number"
            placeholder="e.g. 80.5 kg"
            value={weightInput}
            onChange={e => setWeightInput(e.target.value)}
            step="0.1"
            min="0"
          />
          <button className="btn btn--primary" onClick={logWeight} disabled={!weightInput}>
            Log
          </button>
        </div>
        {logged && <p style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: 8 }}>✓ Weight logged!</p>}

        {weightChartData.length > 1 && (
          <div style={{ marginTop: 20 }}>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={weightChartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
                />
                <Line type="monotone" dataKey="weight" stroke="var(--success)" strokeWidth={2} dot={{ r: 3, fill: 'var(--success)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
