import { Search } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import TweetList from '../components/features/tweet/TweetList'
import Header from '../components/layout/Header'

const topics = ['Technology', 'Design', 'Sports', 'Gaming', 'Music', 'Business']

function ExplorePage() {
  const [query, setQuery] = useState('')
  const tweets = useSelector((state) => state.tweets.tweets)
  const popularTweets = [...tweets].sort((first, second) => second.likes - first.likes).slice(0, 5)
  const matchingTweets = query.trim()
    ? popularTweets.filter((tweet) => tweet.content.toLowerCase().includes(query.toLowerCase()))
    : popularTweets

  return (
    <>
      <Header />
      <div className="p-4">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-twitter-gray" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Twitter" className="w-full rounded-full bg-twitter-dark py-3 pl-12 pr-4 text-white outline-none ring-twitter-blue placeholder:text-twitter-gray focus:ring-2" />
        </label>
      </div>
      <section className="border-b border-twitter-lightGray px-4 pb-4">
        <h2 className="mb-3 text-xl font-extrabold text-white">Explore topics</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {topics.map((topic) => <button key={topic} type="button" className="rounded-2xl bg-twitter-dark px-4 py-5 text-left font-bold text-white transition hover:bg-white/10">{topic}</button>)}
        </div>
      </section>
      <h2 className="px-4 py-4 text-xl font-extrabold text-white">Popular tweets</h2>
      <TweetList tweets={matchingTweets} />
    </>
  )
}

export default ExplorePage
