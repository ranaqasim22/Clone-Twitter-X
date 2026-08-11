import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import TweetList from '../components/features/tweet/TweetList'
import Header from '../components/layout/Header'
import { dummyUsers, suggestedUsers } from '../data/dummyData'
import { toggleFollowing } from '../store/slices/authSlice'

const topics = ['Technology', 'Design', 'Sports', 'Gaming', 'Music', 'Business']

function ExplorePage() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').trim()
  const tweets = useSelector((state) => state.tweets.tweets)
  const followingUsers = useSelector((state) => state.auth.user.followingUsers) || []
  const popularTweets = [...tweets].sort((first, second) => second.likes - first.likes).slice(0, 5)
  const allUsers = [...dummyUsers, ...suggestedUsers]

  const normalizedQuery = query.toLowerCase()
  const matchingTweets = query
    ? tweets.filter((tweet) =>
        tweet.content.toLowerCase().includes(normalizedQuery) ||
        tweet.user.name.toLowerCase().includes(normalizedQuery) ||
        tweet.user.username.toLowerCase().includes(normalizedQuery)
      )
    : popularTweets
  const matchingUsers = query
    ? allUsers.filter((user) =>
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.username.toLowerCase().includes(normalizedQuery)
      )
    : []

  return (
    <>
      <Header />
      <div className="p-4">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-twitter-gray" />
          <input
            type="search"
            value={query}
            onChange={(event) => setSearchParams(event.target.value ? { q: event.target.value } : {})}
            placeholder="Search Twitter"
            className="w-full rounded-full bg-twitter-dark py-3 pl-12 pr-4 text-twitter-text outline-none ring-twitter-blue placeholder:text-twitter-gray focus:ring-2"
          />
        </label>
      </div>

      {query && matchingUsers.length === 0 && matchingTweets.length === 0 ? (
        <p className="p-8 text-center text-twitter-gray">No results for &quot;{query}&quot;.</p>
      ) : (
        <>
          {!query && (
            <section className="border-b border-twitter-lightGray px-4 pb-4">
              <h2 className="mb-3 text-xl font-extrabold text-twitter-text">Explore topics</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {topics.map((topic) => <button key={topic} type="button" className="rounded-2xl bg-twitter-dark px-4 py-5 text-left font-bold text-twitter-text transition hover:bg-twitter-text/10">{topic}</button>)}
              </div>
            </section>
          )}
          {query && (
            <section className="border-b border-twitter-lightGray px-4 pb-4">
              <h2 className="mb-3 text-xl font-extrabold text-twitter-text">People</h2>
              {matchingUsers.length > 0 ? (
                <div className="space-y-3">
                  {matchingUsers.map((person) => {
                    const isFollowing = followingUsers.includes(person.id)
                    return (
                      <div key={person.username} className="flex items-center gap-3 rounded-2xl bg-twitter-dark px-4 py-3 transition hover:bg-twitter-text/5">
                        <Link to={`/profile/${person.username}`} className="flex min-w-0 flex-1 items-center gap-3">
                          <img src={person.avatar} alt="" className="h-10 w-10 rounded-full" />
                          <span className="min-w-0">
                            <span className="block truncate font-bold text-twitter-text">{person.name}</span>
                            <span className="block truncate text-sm text-twitter-gray">@{person.username}</span>
                          </span>
                        </Link>
                        <button type="button" onClick={() => dispatch(toggleFollowing(person.id))} className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold ${isFollowing ? 'border border-twitter-lightGray text-twitter-text hover:bg-red-500/10 hover:text-red-400' : 'bg-twitter-surface text-twitter-surfaceText hover:bg-twitter-surface/80'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-twitter-gray">No people found.</p>
              )}
            </section>
          )}

          <h2 className="px-4 py-4 text-xl font-extrabold text-twitter-text">{query ? 'Posts' : 'Popular tweets'}</h2>
          {query && matchingTweets.length === 0 ? (
            <p className="p-8 text-center text-twitter-gray">No posts found for &quot;{query}&quot;.</p>
          ) : (
            <TweetList tweets={matchingTweets} />
          )}
        </>
      )}
    </>
  )
}

export default ExplorePage
