import { Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const pageTitles = {
  '/': 'Home',
  '/explore': 'Explore',
  '/notifications': 'Notifications',
  '/messages': 'Messages',
  '/bookmarks': 'Bookmarks',
  '/profile': 'Profile',
  '/more': 'More',
}

function Header({ hideSettings = false, children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = pathname.startsWith('/profile/') ? 'Profile' : (pageTitles[pathname] || 'Twitter')

  return (
    <header className="sticky top-0 z-10 border-b border-twitter-lightGray bg-twitter-darker/90 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        <h1 className="text-xl font-extrabold text-twitter-text">{title}</h1>
        {!hideSettings && (
          <button type="button" onClick={() => navigate('/settings/profile')} aria-label="Settings" className="rounded-full p-2 text-twitter-text transition hover:bg-twitter-text/10">
            <Settings className="h-5 w-5" />
          </button>
        )}
      </div>
      {children}
    </header>
  )
}

export default Header
