import { Ellipsis, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTweet } from '../../../store/slices/tweetSlice'
import ReplyComposer from './ReplyComposer'
import TweetActions from './TweetActions'

function formatTimeAgo(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000))
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(timestamp))
}

function TweetCard({ tweet }) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.user)
  const [menuOpen, setMenuOpen] = useState(false)
  const [replying, setReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const isAuthor = Boolean(currentUser?.id) && currentUser.id === tweet.user.id
  const media = tweet.media || []
  const replies = tweet.replies || []

  return (
    <article className="relative flex gap-3 border-b border-twitter-lightGray px-4 py-3 transition hover:bg-twitter-text/[0.03]">
      <Link to={`/profile/${tweet.user.username}`} aria-label={`${tweet.user.name}'s profile`} className="shrink-0">
        <img src={tweet.user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1 pr-8 text-sm">
          <Link to={`/profile/${tweet.user.username}`} className="truncate font-bold text-twitter-text hover:underline">{tweet.user.name}</Link>
          <span className="truncate text-twitter-gray">@{tweet.user.username}</span>
          <span className="text-twitter-gray">·</span>
          <time dateTime={tweet.createdAt} className="shrink-0 text-twitter-gray">{formatTimeAgo(tweet.createdAt)}</time>
        </div>
        <p className="whitespace-pre-wrap break-words text-[15px] leading-5 text-twitter-text">{tweet.content}</p>

        {tweet.quoteTweet && <div className="mt-3 rounded-2xl border border-twitter-lightGray p-3"><div className="flex items-center gap-2"><img src={tweet.quoteTweet.user.avatar} alt="" className="h-5 w-5 rounded-full" /><span className="text-sm font-bold text-twitter-text">{tweet.quoteTweet.user.name}</span><span className="text-sm text-twitter-gray">@{tweet.quoteTweet.user.username}</span></div><p className="mt-2 whitespace-pre-wrap text-sm text-twitter-text">{tweet.quoteTweet.content}</p>{tweet.quoteTweet.media?.[0] && <img src={tweet.quoteTweet.media[0]} alt="Quoted post attachment" className="mt-3 h-40 w-full rounded-xl object-cover" />}</div>}

        {media.length > 0 && (
          <div className={`mt-3 grid overflow-hidden rounded-2xl border border-twitter-lightGray ${media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {media.slice(0, 4).map((source, index) => (
              <img key={`${source}-${index}`} src={source} alt="Tweet attachment" className="h-64 w-full object-cover" />
            ))}
          </div>
        )}

        <TweetActions tweet={tweet} onReply={() => setReplying(true)} />

        {replying && <ReplyComposer tweet={tweet} onPosted={() => setReplying(false)} />}

        {replies.length > 0 && (
          <button type="button" onClick={() => setShowReplies((current) => !current)} className="mt-2 text-sm text-twitter-gray transition hover:text-twitter-blue">
            {showReplies ? 'Hide' : 'Show'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
          </button>
        )}

        {showReplies && (
          <div className="mt-3 space-y-4 border-t border-twitter-lightGray pt-3">
            {replies.map((reply) => (
              <div key={reply.id} className="flex gap-3">
                <Link to={`/profile/${reply.user.username}`} className="shrink-0">
                  <img src={reply.user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                </Link>
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-1 text-sm">
                    <Link to={`/profile/${reply.user.username}`} className="truncate font-bold text-twitter-text hover:underline">{reply.user.name}</Link>
                    <span className="truncate text-twitter-gray">@{reply.user.username}</span>
                    <span className="text-twitter-gray">·</span>
                    <time dateTime={reply.createdAt} className="shrink-0 text-twitter-gray">{formatTimeAgo(reply.createdAt)}</time>
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm text-twitter-text">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAuthor && (
        <div className="absolute right-2 top-2">
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Tweet options" className="rounded-full p-2 text-twitter-gray hover:bg-twitter-blue/10 hover:text-twitter-blue"><Ellipsis className="h-5 w-5" /></button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-32 rounded-xl bg-twitter-dark py-1 shadow-lg ring-1 ring-twitter-lightGray">
              <button type="button" onClick={() => dispatch(deleteTweet(tweet.id))} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-twitter-text/5"><Trash2 className="h-4 w-4" />Delete</button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default TweetCard

