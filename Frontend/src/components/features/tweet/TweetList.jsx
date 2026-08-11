import { useSelector } from 'react-redux'
import Spinner from '../../common/Spinner'
import Toast from '../../common/Toast'
import TweetCard from './TweetCard'

function TweetList({ tweets = [] }) {
  const loading = useSelector((state) => state.tweets.loading)
  const error = useSelector((state) => state.tweets.error)
  const sortedTweets = [...tweets].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))

  if (loading) {
    return <div className="flex justify-center p-8 text-twitter-blue"><Spinner className="h-7 w-7" /></div>
  }

  if (error) return <Toast message={error} />

  if (sortedTweets.length === 0) {
    return <p className="p-8 text-center text-twitter-gray">No tweets yet</p>
  }

  return <div>{sortedTweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)}</div>
}

export default TweetList
