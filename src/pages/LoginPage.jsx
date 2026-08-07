import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginFailure, loginStart, loginSuccess } from '../store/slices/authSlice'
import Spinner from '../components/common/Spinner'

function XLogo() {
  return <svg viewBox="0 0 24 24" aria-label="X" className="mx-auto h-10 w-10 fill-current text-white" role="img"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
}

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error } = useSelector((state) => state.auth)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!identifier.trim() || !password) {
      dispatch(loginFailure('Email or username and password are required.'))
      return
    }

    dispatch(loginStart())
    await new Promise((resolve) => setTimeout(resolve, 350))
    const username = identifier.replace(/^@/, '').split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'twitteruser'
    dispatch(loginSuccess({
      token: `demo-token-${Date.now()}`,
      user: { id: 'current-user', name: 'Twitter User', username, email: identifier.includes('@') ? identifier : `${username}@example.com`, avatar: `https://ui-avatars.com/api/?name=Twitter+User&background=1D9BF0&color=fff`, bio: 'Welcome to twitter-clone!', coverPhoto: '', followers: 0, following: 0, joinedDate: 'August 2026' },
    }))
    navigate(location.state?.from?.pathname || '/', { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-twitter-darker px-4 py-8">
      <section className="w-full max-w-md rounded-2xl bg-twitter-dark p-8 shadow-xl">
        <XLogo />
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to X</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
          <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder="Email or username" autoComplete="username" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 text-white outline-none placeholder:text-twitter-gray focus:border-twitter-blue" />
          <div className="relative"><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Password" autoComplete="current-password" required className="w-full rounded-lg border border-twitter-gray bg-transparent px-4 py-3 pr-12 text-white outline-none placeholder:text-twitter-gray focus:border-twitter-blue" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-twitter-gray hover:text-white">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-twitter-blue py-3 font-bold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50">{loading && <Spinner className="h-5 w-5" />}{loading ? 'Logging in…' : 'Log in'}</button>
        </form>
        <button type="button" className="mt-5 w-full text-center text-sm text-twitter-blue hover:underline">Forgot password?</button>
        <p className="mt-6 text-center text-sm text-twitter-gray">Don&apos;t have an account? <Link to="/register" className="text-twitter-blue hover:underline">Sign up</Link></p>
      </section>
    </main>
  )
}

export default LoginPage
