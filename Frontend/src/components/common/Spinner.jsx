import { LoaderCircle } from 'lucide-react'

function Spinner({ className = 'h-5 w-5' }) {
  return <LoaderCircle aria-label="Loading" className={`animate-spin ${className}`} />
}

export default Spinner
