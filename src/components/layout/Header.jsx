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

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const title = pathname.startsWith('/profile/') ? 'Profile' : (pageTitles[pathname] || 'Twitter')

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-twitter-lightGray bg-twitter-darker/90 px-4 backdrop-blur">
      <h1 className="text-xl font-extrabold text-white">{title}</h1>
      <button type="button" onClick={() => navigate('/settings/profile')} aria-label="Settings" className="rounded-full p-2 text-white transition hover:bg-white/10">
        <Settings className="h-5 w-5" />
      </button>
    </header>
  )
}

export default Header
