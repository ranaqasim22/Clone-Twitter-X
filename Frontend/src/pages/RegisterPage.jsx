import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginFailure, loginStart, loginSuccess } from '../store/slices/authSlice'
import Spinner from '../components/common/Spinner'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' })

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (Object.values(form).some((value) => !value.trim())) return dispatch(loginFailure('Please complete every field.'))
    if (form.password.length < 6) return dispatch(loginFailure('Password must be at least 6 characters.'))
    if (form.password !== form.confirmPassword) return dispatch(loginFailure('Passwords do not match.'))

    dispatch(loginStart())
    await new Promise((resolve) => setTimeout(resolve, 350))
    dispatch(loginSuccess({
      token: `demo-token-${Date.now()}`,
      user: { id: 'current-user', name: form.name.trim(), username: form.username.trim().replace(/^@/, ''), email: form.email.trim(), avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=1D9BF0&color=fff`, bio: '', coverPhoto: '', followers: 0, following: 0, joinedDate: 'August 2026' },
    }))
    navigate('/', { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-twitter-darker px-4 py-8">
      <section className="w-full max-w-md rounded-2xl bg-twitter-dark p-8 shadow-xl">
        <h1 className="text-center text-3xl font-extrabold text-twitter-text">Create your account</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
          <input name="name" value={form.name} onChange={updateField} placeholder="Name" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 text-twitter-text outline-none placeholder:text-twitter-gray focus:border-twitter-blue" />
          <input name="username" value={form.username} onChange={updateField} placeholder="Username" autoComplete="username" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 text-twitter-text outline-none placeholder:text-twitter-gray focus:border-twitter-blue" />
          <input name="email" value={form.email} onChange={updateField} type="email" placeholder="Email" autoComplete="email" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 text-twitter-text outline-none placeholder:text-twitter-gray focus:border-twitter-blue" />
          <div className="relative"><input name="password" value={form.password} onChange={updateField} type={showPassword ? 'text' : 'password'} placeholder="Password" autoComplete="new-password" minLength="6" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 pr-12 text-twitter-text outline-none placeholder:text-twitter-gray focus:border-twitter-blue" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-twitter-gray hover:text-twitter-text">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
          <input name="confirmPassword" value={form.confirmPassword} onChange={updateField} type={showPassword ? 'text' : 'password'} placeholder="Confirm password" autoComplete="new-password" minLength="6" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 text-twitter-text outline-none placeholder:text-twitter-gray focus:border-twitter-blue" />
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-twitter-blue py-3 font-bold text-twitter-text transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50">{loading && <Spinner className="h-5 w-5" />}{loading ? 'Creating account…' : 'Create account'}</button>
        </form>
        <p className="mt-6 text-center text-sm text-twitter-gray">Already have an account? <Link to="/login" className="text-twitter-blue hover:underline">Log in</Link></p>
      </section>
    </main>
  )
}

export default RegisterPage
