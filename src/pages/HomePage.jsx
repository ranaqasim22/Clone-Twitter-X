import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import TweetComposer from '../components/features/tweet/TweetComposer'
import TweetList from '../components/features/tweet/TweetList'

function HomePage() {
  const tweets = useSelector((state) => state.tweets.tweets)
  const location = useLocation()
  const navigate = useNavigate()
  const composing = new URLSearchParams(location.search).get('compose') === '1'

  return (
    <>
      <Header />
      <TweetComposer autoFocus={composing} onPosted={() => navigate('/', { replace: true })} />
      <TweetList tweets={tweets} />
    </>
  )
}

export default HomePage
