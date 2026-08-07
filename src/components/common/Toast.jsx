import { CircleAlert } from 'lucide-react'

function Toast({ message }) {
  if (!message) return null

  return <div role="alert" className="mx-4 my-3 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"><CircleAlert className="h-5 w-5 shrink-0" /><span>{message}</span></div>
}

export default Toast
