import { useSelector } from 'react-redux'
import TweetList from '../components/features/tweet/TweetList'
import Header from '../components/layout/Header'

function BookmarksPage() {
  const tweets = useSelector((state) => state.tweets.tweets)
  const bookmarks = tweets.filter((tweet) => tweet.bookmarkedByCurrentUser)

  return (
    <>
      <Header />
      {bookmarks.length > 0 ? (
        <TweetList tweets={bookmarks} />
      ) : (
        <div className="p-8 text-center">
          <p className="text-2xl font-extrabold text-twitter-text">Save posts for later</p>
          <p className="mx-auto mt-2 max-w-sm text-twitter-gray">Bookmark posts to easily find them again in the future.</p>
        </div>
      )}
    </>
  )
}

export default BookmarksPage
