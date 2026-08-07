import { Image, Smile, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTweet } from '../../../store/slices/tweetSlice'

const MAX_CHARACTERS = 280
const emojis = ['😀', '😂', '😍', '🔥', '🎉', '👏', '❤️', '👍', '🙏', '🚀', '😢', '🤔']

function TweetComposer({ autoFocus = false, onPosted }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const textareaRef = useRef(null)
  const imageInputRef = useRef(null)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState([])
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [isTweeting, setIsTweeting] = useState(false)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [content])

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus()
  }, [autoFocus])

  const remainingCharacters = MAX_CHARACTERS - content.length
  const canTweet = (content.trim().length > 0 || media.length > 0) && remainingCharacters >= 0 && !isTweeting
  const displayName = user?.name || 'Guest User'
  const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1D9BF0&color=fff`

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canTweet) return

    setIsTweeting(true)
    dispatch(addTweet({
      id: globalThis.crypto?.randomUUID?.() || `tweet-${Date.now()}`,
      user: {
        id: user?.id || 'current-user',
        name: displayName,
        username: user?.username || 'guest',
        avatar,
      },
      content: content.trim(),
      createdAt: new Date().toISOString(),
      replies: 0,
      retweets: 0,
      likes: 0,
      likedByCurrentUser: false,
      retweetedByCurrentUser: false,
      media,
    }))
    setContent('')
    setMedia([])
    if (imageInputRef.current) imageInputRef.current.value = ''
    setIsTweeting(false)
    onPosted?.()
  }

  const addImages = (event) => {
    const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith('image/'))
    files.slice(0, 4 - media.length).forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => setMedia((current) => current.length < 4 ? [...current, String(reader.result)] : current)
      reader.readAsDataURL(file)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="border-b border-twitter-lightGray px-4 py-3">
      <div className="flex gap-3">
        <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What is happening?!"
            rows={1}
            className="max-h-52 w-full resize-none overflow-y-auto bg-transparent py-2 text-xl text-white outline-none placeholder:text-twitter-gray"
          />
          {media.length > 0 && <div className={`mt-3 grid gap-1 overflow-hidden rounded-2xl border border-twitter-lightGray ${media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>{media.map((source, index) => <div key={source} className="relative"><img src={source} alt={`Selected attachment ${index + 1}`} className="h-44 w-full object-cover" /><button type="button" onClick={() => setMedia((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label="Remove image" className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black"><X className="h-4 w-4" /></button></div>)}</div>}
          <div className="mt-3 flex items-center justify-between border-t border-twitter-lightGray pt-3">
            <div className="flex items-center gap-1 text-twitter-blue">
              <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={addImages} className="hidden" />
              <button type="button" onClick={() => imageInputRef.current?.click()} aria-label="Add image" disabled={media.length >= 4} className="rounded-full p-2 hover:bg-twitter-blue/10 disabled:cursor-not-allowed disabled:opacity-40"><Image className="h-5 w-5" /></button>
              <div className="relative"><button type="button" onClick={() => setEmojiOpen((open) => !open)} aria-label="Add emoji" className="rounded-full p-2 hover:bg-twitter-blue/10"><Smile className="h-5 w-5" /></button>{emojiOpen && <div className="absolute bottom-full left-0 z-10 mb-2 grid w-52 grid-cols-4 gap-1 rounded-xl bg-twitter-dark p-2 shadow-xl ring-1 ring-twitter-lightGray">{emojis.map((emoji) => <button key={emoji} type="button" onClick={() => { setContent((current) => current + emoji); setEmojiOpen(false); textareaRef.current?.focus() }} className="rounded-lg p-2 text-xl hover:bg-white/10">{emoji}</button>)}</div>}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm ${remainingCharacters < 0 ? 'font-bold text-red-500' : 'text-twitter-gray'}`}>{remainingCharacters}</span>
              <button type="submit" disabled={!canTweet} className="rounded-full bg-twitter-blue px-5 py-2 text-sm font-bold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50">
                {isTweeting ? 'Posting…' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default TweetComposer
