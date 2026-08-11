import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReply } from '../../../store/slices/tweetSlice'

const MAX_CHARACTERS = 280

function ReplyComposer({ tweet, onPosted }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [content, setContent] = useState('')

  const displayName = user?.name || 'Guest User'
  const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1D9BF0&color=fff`
  const remainingCharacters = MAX_CHARACTERS - content.length
  const canPost = content.trim().length > 0 && remainingCharacters >= 0

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canPost) return

    dispatch(addReply({
      tweetId: tweet.id,
      reply: {
        id: globalThis.crypto?.randomUUID?.() || `reply-${Date.now()}`,
        user: { id: user?.id || 'current-user', name: displayName, username: user?.username || 'guest', avatar },
        content: content.trim(),
        createdAt: new Date().toISOString(),
      },
    }))
    setContent('')
    onPosted?.()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex gap-3 rounded-2xl border border-twitter-lightGray p-3">
      <img src={avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Post your reply"
          rows={2}
          className="w-full resize-none bg-transparent text-sm text-twitter-text outline-none placeholder:text-twitter-gray"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className={`text-xs ${remainingCharacters < 0 ? 'font-bold text-red-500' : 'text-twitter-gray'}`}>{remainingCharacters}</span>
          <button type="submit" disabled={!canPost} className="rounded-full bg-twitter-blue px-4 py-1.5 text-sm font-bold text-twitter-text transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50">Reply</button>
        </div>
      </div>
    </form>
  )
}

export default ReplyComposer
