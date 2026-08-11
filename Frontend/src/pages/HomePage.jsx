import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import TweetComposer from '../components/features/tweet/TweetComposer'
import TweetList from '../components/features/tweet/TweetList'

function HomePage() {
  const tweets = useSelector((state) => state.tweets.tweets)
  const followingUsers = useSelector((state) => state.auth.user.followingUsers) || []
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState('For You')
  const composing = new URLSearchParams(location.search).get('compose') === '1'

  const visibleTweets = tab === 'Following'
    ? tweets.filter((tweet) => followingUsers.includes(tweet.user.id))
    : tweets

  return (
    <>
      <Header hideSettings>
        <div className="flex border-b border-twitter-lightGray">
          {['For You', 'Following'].map((label) => (
            <button key={label} type="button" onClick={() => setTab(label)} className={`relative flex-1 py-4 text-sm transition ${tab === label ? 'font-bold text-twitter-text' : 'text-twitter-gray'}`}>
              {label}
              {tab === label && <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-twitter-blue" />}
            </button>
          ))}
        </div>
      </Header>
      <TweetComposer autoFocus={composing} onPosted={() => navigate('/', { replace: true })} />
      {tab === 'Following' && visibleTweets.length === 0 ? (
        <p className="p-8 text-center text-twitter-gray">Follow more people to see their posts here.</p>
      ) : (
        <TweetList tweets={visibleTweets} />
      )}
    </>
  )
}

export default HomePage
