import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthGuard from './components/common/AuthGuard'
import Layout from './components/layout/Layout'
import BookmarksPage from './pages/BookmarksPage'
import ExplorePage from './pages/ExplorePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const theme = useSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="min-h-screen bg-twitter-darker text-twitter-text transition-colors duration-300">
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AuthGuard><Layout /></AuthGuard>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </div>
  )
}

export default App
