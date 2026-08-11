import { Bell, Bookmark, Ellipsis, House, LogOut, Mail, Moon, Search, Settings, Sun, UserRound } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { toggleTheme } from '../../store/slices/uiSlice'

const navigation = [
  { label: 'Home', to: '/', icon: House, end: true }, { label: 'Explore', to: '/explore', icon: Search }, { label: 'Notifications', to: '/notifications', icon: Bell }, { label: 'Messages', to: '/messages', icon: Mail }, { label: 'Bookmarks', to: '/bookmarks', icon: Bookmark }, { label: 'Profile', to: '/profile', icon: UserRound }, { label: 'Settings', to: '/settings', icon: Settings }, { label: 'More', to: '/more', icon: Ellipsis },
]

function XLogo() {
  return <svg viewBox="0 0 24 24" aria-label="X" className="h-7 w-7 fill-current" role="img"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
}

function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const theme = useSelector((state) => state.ui.theme)
  const [menuOpen, setMenuOpen] = useState(false)
  const profileName = user?.name || 'Guest User'
  const username = user?.username || 'guest'
  const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileName)}&background=1D9BF0&color=fff`
  const handleLogout = () => { dispatch(logout()); navigate('/login', { replace: true }) }

  return <aside className="sticky top-0 flex h-screen w-16 flex-col border-r border-twitter-lightGray px-1 py-2 transition-colors sm:w-20 sm:px-2 xl:w-64 xl:px-3"><NavLink to="/" className="mb-1 flex h-12 w-12 items-center justify-center rounded-full text-twitter-text transition-colors hover:bg-twitter-text/10" aria-label="Home"><XLogo /></NavLink><nav className="flex flex-1 flex-col gap-1">{navigation.map(({ label, to, icon: Icon, end }) => { const destination = label === 'Profile' ? `/profile/${username}` : to; return <NavLink key={label} to={destination} end={end} className={({ isActive }) => `flex w-fit items-center gap-4 rounded-full p-3 text-xl transition-all duration-200 hover:bg-twitter-text/10 ${isActive ? 'active font-bold' : 'text-twitter-text'}`}><Icon className="h-6 w-6" strokeWidth={2} /><span className="hidden text-xl xl:block">{label}</span></NavLink> })}<button type="button" onClick={() => navigate('/?compose=1')} aria-label="Create a post" className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-twitter-blue font-bold text-twitter-text transition-all duration-200 hover:bg-sky-500 xl:w-full"><span className="xl:hidden">+</span><span className="hidden xl:block">Post</span></button></nav><div className="relative"><button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex w-full items-center gap-3 rounded-full p-2 text-left transition-colors hover:bg-twitter-text/10"><img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" /><span className="hidden min-w-0 flex-1 xl:block"><span className="block truncate font-bold text-twitter-text">{profileName}</span><span className="block truncate text-sm text-twitter-gray">@{username}</span></span><Ellipsis className="hidden h-5 w-5 text-twitter-text xl:block" /></button>{menuOpen && <div className="absolute bottom-full left-0 mb-2 w-52 rounded-xl bg-twitter-dark p-1 shadow-xl ring-1 ring-twitter-lightGray"><button type="button" onClick={() => { dispatch(toggleTheme()); setMenuOpen(false) }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-twitter-text transition-colors hover:bg-twitter-text/10">{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button><button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-400 transition-colors hover:bg-twitter-text/10"><LogOut className="h-4 w-4" />Log out @{username}</button></div>}</div></aside>
}

export default Sidebar
