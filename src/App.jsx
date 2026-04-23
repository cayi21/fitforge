import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getProfile } from './utils/storage'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Workout from './pages/Workout'
import ExerciseLibrary from './pages/ExerciseLibrary'
import ExerciseDetail from './pages/ExerciseDetail'
import Progress from './pages/Progress'
import Nutrition from './pages/Nutrition'

function RequireOnboarding({ children }) {
  const profile = getProfile()
  if (!profile?.onboardingComplete) {
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={
            <RequireOnboarding>
              <Layout><Dashboard /></Layout>
            </RequireOnboarding>
          }
        />
        <Route
          path="/workout"
          element={
            <RequireOnboarding>
              <Layout hideNav><Workout /></Layout>
            </RequireOnboarding>
          }
        />
        <Route
          path="/exercises"
          element={
            <RequireOnboarding>
              <Layout><ExerciseLibrary /></Layout>
            </RequireOnboarding>
          }
        />
        <Route
          path="/exercises/:slug"
          element={
            <RequireOnboarding>
              <Layout><ExerciseDetail /></Layout>
            </RequireOnboarding>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireOnboarding>
              <Layout><Progress /></Layout>
            </RequireOnboarding>
          }
        />
        <Route
          path="/nutrition"
          element={
            <RequireOnboarding>
              <Layout><Nutrition /></Layout>
            </RequireOnboarding>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
