import { useNavigate, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function Layout({ children, hideNav = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isDetail = location.pathname.startsWith('/exercises/') && location.pathname !== '/exercises'

  return (
    <>
      <header className="top-bar">
        {isDetail ? (
          <button className="top-bar__back" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        ) : (
          <span className="top-bar__brand">
            Fit<span>Forge</span>
          </span>
        )}
      </header>

      <main className={`page ${hideNav ? 'page--no-nav' : ''}`}>
        <div className="container">
          {children}
        </div>
      </main>

      {!hideNav && <BottomNav />}
    </>
  )
}
