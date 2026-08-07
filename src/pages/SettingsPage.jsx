import { ChevronRight, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { passwordChanged, updateUser } from '../store/slices/authSlice'
import Header from '../components/layout/Header'

const navItems = [
  { label: 'Your account', to: 'profile', icon: UserRound },
  { label: 'Password', to: 'password', icon: LockKeyhole },
]

const fieldClass = 'mt-1 w-full rounded-lg border border-twitter-lightGray bg-transparent px-3 py-2.5 text-white outline-none placeholder:text-twitter-gray focus:border-twitter-blue'

function SettingNav() {
  return <nav className="border-b border-twitter-lightGray sm:w-72 sm:border-b-0 sm:border-r">{navItems.map(({ label, to, icon: Icon }) => <NavLink key={to} to={`/settings/${to}`} className={({ isActive }) => `flex items-center gap-3 border-b border-twitter-lightGray px-4 py-4 transition-colors hover:bg-white/5 ${isActive ? 'bg-twitter-blue/10 text-twitter-blue' : 'text-white'}`}><Icon className="h-5 w-5" /><span className="flex-1 font-semibold">{label}</span><ChevronRight className="h-4 w-4 text-twitter-gray" /></NavLink>)}</nav>
}

function ProfileSettings() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [form, setForm] = useState(() => ({ name: user.name || '', username: user.username || '', bio: user.bio || '', location: user.location || '', website: user.website || '', avatar: user.avatar || '', coverPhoto: user.coverPhoto || '' }))
  const [saved, setSaved] = useState(false)
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const chooseImage = (field) => (event) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => setForm((current) => ({ ...current, [field]: String(reader.result) }))
    reader.readAsDataURL(file)
  }
  const submit = (event) => {
    event.preventDefault()
    const username = form.username.trim().replace(/^@/, '').replace(/[^a-zA-Z0-9_]/g, '')
    if (!form.name.trim() || !username) return
    dispatch(updateUser({ ...form, name: form.name.trim(), username, website: form.website.trim(), location: form.location.trim() }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    if (username !== user.username) navigate(`/profile/${username}`)
  }
  return <section className="p-4 sm:p-6"><h2 className="text-xl font-extrabold text-white">Edit profile</h2><p className="mt-1 text-sm text-twitter-gray">Update what people see when they visit your profile.</p><form onSubmit={submit} className="mt-6 space-y-4"><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold text-white">Profile photo URL<input name="avatar" value={form.avatar || ''} onChange={change} placeholder="https://example.com/photo.jpg" className={fieldClass} /><span className="mt-2 block font-normal text-twitter-gray">or <input type="file" accept="image/*" onChange={chooseImage('avatar')} className="text-xs text-twitter-gray file:mr-2 file:rounded-full file:border-0 file:bg-twitter-blue file:px-3 file:py-1 file:font-semibold file:text-white" /></span></label><label className="text-sm font-semibold text-white">Cover photo URL<input name="coverPhoto" value={form.coverPhoto || ''} onChange={change} placeholder="https://example.com/cover.jpg" className={fieldClass} /><span className="mt-2 block font-normal text-twitter-gray">or <input type="file" accept="image/*" onChange={chooseImage('coverPhoto')} className="text-xs text-twitter-gray file:mr-2 file:rounded-full file:border-0 file:bg-twitter-blue file:px-3 file:py-1 file:font-semibold file:text-white" /></span></label></div><div className="flex items-center gap-4 rounded-xl border border-twitter-lightGray p-3"><img src={form.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || 'User')}&background=1D9BF0&color=fff`} alt="Profile preview" className="h-16 w-16 rounded-full object-cover" /><div className="min-w-0"><p className="font-bold text-white">{form.name || 'Your name'}</p><p className="truncate text-sm text-twitter-gray">@{form.username || 'username'}</p></div></div><label className="block text-sm font-semibold text-white">Name<input name="name" value={form.name || ''} onChange={change} maxLength="50" required className={fieldClass} /></label><label className="block text-sm font-semibold text-white">Username<input name="username" value={form.username || ''} onChange={change} maxLength="15" required className={fieldClass} /></label><label className="block text-sm font-semibold text-white">Bio<textarea name="bio" value={form.bio || ''} onChange={change} maxLength="160" rows="3" className={fieldClass} /></label><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold text-white">Location<input name="location" value={form.location || ''} onChange={change} maxLength="30" className={fieldClass} /></label><label className="text-sm font-semibold text-white">Website<input name="website" value={form.website || ''} onChange={change} placeholder="example.com" className={fieldClass} /></label></div><button className="rounded-full bg-twitter-blue px-5 py-2.5 font-bold text-white hover:bg-sky-500">{saved ? 'Saved!' : 'Save changes'}</button>{saved && <span className="ml-3 text-sm text-emerald-400">Your profile is updated.</span>}</form></section>
}

function PasswordSettings() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [visible, setVisible] = useState({})
  const [message, setMessage] = useState('')
  const submit = (event) => { event.preventDefault(); if (!form.current || form.next.length < 6) return setMessage('Enter your current password and a new password of at least 6 characters.'); if (form.next !== form.confirm) return setMessage('The new passwords do not match.'); dispatch(passwordChanged()); setForm({ current: '', next: '', confirm: '' }); setMessage('Your password has been changed for this demo account.') }
  return <section className="p-4 sm:p-6"><h2 className="text-xl font-extrabold text-white">Change your password</h2><p className="mt-1 text-sm text-twitter-gray">Use at least 6 characters. This demo stores no password value in the browser.</p><form onSubmit={submit} className="mt-6 max-w-md space-y-4">{['current', 'next', 'confirm'].map((name) => <label key={name} className="block text-sm font-semibold capitalize text-white">{name === 'next' ? 'New password' : name === 'confirm' ? 'Confirm new password' : 'Current password'}<div className="relative"><input value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} type={visible[name] ? 'text' : 'password'} autoComplete={name === 'current' ? 'current-password' : 'new-password'} required className={`${fieldClass} pr-12`} /><button type="button" onClick={() => setVisible((current) => ({ ...current, [name]: !current[name] }))} aria-label={visible[name] ? `Hide ${name} password` : `Show ${name} password`} className="absolute right-3 top-1/2 -translate-y-1/2 text-twitter-gray hover:text-white">{visible[name] ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label>)}<button className="rounded-full bg-twitter-blue px-5 py-2.5 font-bold text-white hover:bg-sky-500">Change password</button>{message && <p role="status" className={message.startsWith('Your') ? 'text-sm text-emerald-400' : 'text-sm text-red-400'}>{message}</p>}</form></section>
}

function SettingsPage() { return <><Header /><div className="sm:flex"><SettingNav /><main className="min-w-0 flex-1"><Routes><Route index element={<Navigate to="profile" replace />} /><Route path="profile" element={<ProfileSettings />} /><Route path="password" element={<PasswordSettings />} /><Route path="*" element={<Navigate to="profile" replace />} /></Routes></main></div></> }

export default SettingsPage
