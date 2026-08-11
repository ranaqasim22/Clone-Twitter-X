import { Bookmark, Heart, Link2, Mail, MessageCircle, Repeat2, Share, Smile, X } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addTweet, likeTweet, retweetTweet, toggleBookmark } from '../../../store/slices/tweetSlice'

const emojis = ['😀', '😂', '😍', '🔥', '🎉', '👏', '❤️', '👍', '🙏', '🚀', '😢', '🤔']

function TweetActions({ tweet, onReply }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quote, setQuote] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyLink = async () => {
    const url = `${window.location.origin}/tweet/${tweet.id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => { setCopied(false); setShareOpen(false) }, 2000)
    } catch {
      setShareOpen(false)
    }
  }
  const sendDirectMessage = () => {
    navigate('/messages')
    setShareOpen(false)
  }
  const repost = () => {
    const name = user?.name || 'Guest User'
    dispatch(addTweet({
      id: globalThis.crypto?.randomUUID?.() || `tweet-${Date.now()}`,
      user: { id: user?.id || 'current-user', name, username: user?.username || 'guest', avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1D9BF0&color=fff` },
      content: quote.trim(),
      quoteTweet: { id: tweet.id, user: tweet.user, content: tweet.content, media: tweet.media || [] },
      createdAt: new Date().toISOString(), replies: [], retweets: 0, likes: 0, likedByCurrentUser: false, retweetedByCurrentUser: false, bookmarkedByCurrentUser: false,
    }))
    dispatch(retweetTweet(tweet.id))
    setQuote('')
    setQuoteOpen(false)
  }

  return (
    <div className="mt-3 flex max-w-md items-center justify-between text-twitter-gray">
      <button type="button" onClick={() => onReply?.(tweet)} aria-label="Reply" className="group flex items-center gap-2 text-sm hover:text-twitter-blue">
        <span className="rounded-full p-2 group-hover:bg-twitter-blue/10"><MessageCircle className="h-4 w-4" /></span>
        <span>{tweet.replies?.length || 0}</span>
      </button>
      <button type="button" onClick={() => setQuoteOpen(true)} aria-label="Quote repost" className={`group flex items-center gap-2 text-sm hover:text-emerald-500 ${tweet.retweetedByCurrentUser ? 'text-emerald-500' : ''}`}>
        <span className="rounded-full p-2 group-hover:bg-emerald-500/10"><Repeat2 className="h-4 w-4" /></span>
        <span>{tweet.retweets || 0}</span>
      </button>
      <button type="button" onClick={() => dispatch(likeTweet(tweet.id))} aria-label="Like" className={`group flex items-center gap-2 text-sm hover:text-pink-500 ${tweet.likedByCurrentUser ? 'text-pink-500' : ''}`}>
        <span className="rounded-full p-2 group-hover:bg-pink-500/10"><Heart className={`h-4 w-4 transition-transform duration-200 ${tweet.likedByCurrentUser ? 'scale-110 fill-current' : ''}`} /></span>
        <span>{tweet.likes || 0}</span>
      </button>
      <button type="button" onClick={() => dispatch(toggleBookmark(tweet.id))} aria-label={tweet.bookmarkedByCurrentUser ? 'Remove bookmark' : 'Bookmark'} className={`group rounded-full p-2 hover:bg-twitter-blue/10 hover:text-twitter-blue ${tweet.bookmarkedByCurrentUser ? 'text-twitter-blue' : ''}`}><Bookmark className={`h-4 w-4 ${tweet.bookmarkedByCurrentUser ? 'fill-current' : ''}`} /></button>
      <div className="relative">
        <button type="button" onClick={() => { setShareOpen((open) => !open); setCopied(false) }} aria-label="Share" aria-expanded={shareOpen} className={`group rounded-full p-2 hover:bg-twitter-blue/10 hover:text-twitter-blue ${shareOpen ? 'text-twitter-blue' : ''}`}><Share className="h-4 w-4" /></button>
        {shareOpen && (
          <div className="absolute bottom-full right-0 z-20 mb-2 w-64 rounded-xl bg-twitter-dark p-1 shadow-xl ring-1 ring-twitter-lightGray">
            <button type="button" onClick={copyLink} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-twitter-text transition hover:bg-twitter-text/5"><Link2 className="h-4 w-4 text-twitter-blue" />{copied ? 'Copied!' : 'Copy link'}</button>
            <button type="button" onClick={sendDirectMessage} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-twitter-text transition hover:bg-twitter-text/5"><Mail className="h-4 w-4 text-twitter-blue" />Send via Direct Message</button>
            <button type="button" onClick={() => dispatch(toggleBookmark(tweet.id))} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-twitter-text transition hover:bg-twitter-text/5"><Bookmark className={`h-4 w-4 text-twitter-blue ${tweet.bookmarkedByCurrentUser ? 'fill-current' : ''}`} />{tweet.bookmarkedByCurrentUser ? 'Remove from Bookmarks' : 'Add to Bookmarks'}</button>
          </div>
        )}
      </div>
      {quoteOpen && <div className="fixed inset-0 z-30 flex items-start justify-center bg-black/60 p-4 pt-16"><section role="dialog" aria-modal="true" aria-label="Quote repost" className="w-full max-w-lg rounded-2xl bg-twitter-darker shadow-2xl ring-1 ring-twitter-lightGray"><div className="flex items-center justify-between border-b border-twitter-lightGray px-4 py-3"><h2 className="text-xl font-bold text-twitter-text">Quote repost</h2><button type="button" onClick={() => setQuoteOpen(false)} aria-label="Close" className="rounded-full p-2 text-twitter-text hover:bg-twitter-text/10"><X className="h-5 w-5" /></button></div><div className="p-4"><textarea value={quote} onChange={(event) => setQuote(event.target.value)} maxLength="280" rows="4" placeholder="Add a comment" className="w-full resize-none bg-transparent text-lg text-twitter-text outline-none placeholder:text-twitter-gray" /><div className="rounded-xl border border-twitter-lightGray p-3"><div className="flex gap-2"><img src={tweet.user.avatar} alt="" className="h-8 w-8 rounded-full" /><span className="min-w-0"><strong className="text-sm text-twitter-text">{tweet.user.name}</strong><span className="ml-1 text-sm text-twitter-gray">@{tweet.user.username}</span></span></div><p className="mt-2 line-clamp-3 text-sm text-twitter-text">{tweet.content}</p></div><div className="mt-3 flex items-center justify-between"><div className="relative"><button type="button" onClick={() => setEmojiOpen((open) => !open)} aria-label="Add emoji" className="rounded-full p-2 text-twitter-blue hover:bg-twitter-blue/10"><Smile className="h-5 w-5" /></button>{emojiOpen && <div className="absolute bottom-full left-0 mb-2 grid w-52 grid-cols-4 gap-1 rounded-xl bg-twitter-dark p-2 shadow-xl ring-1 ring-twitter-lightGray">{emojis.map((emoji) => <button key={emoji} type="button" onClick={() => { setQuote((current) => current + emoji); setEmojiOpen(false) }} className="rounded-lg p-2 text-xl hover:bg-twitter-text/10">{emoji}</button>)}</div>}</div><button type="button" onClick={repost} className="rounded-full bg-twitter-blue px-5 py-2 font-bold text-twitter-text hover:bg-sky-500">Repost</button></div></div></section></div>}
    </div>
  )
}

export default TweetActions
