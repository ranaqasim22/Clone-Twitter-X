import { useDispatch, useSelector } from 'react-redux'
import {
  addTweet as addTweetAction,
  addReply as addReplyAction,
  deleteTweet as deleteTweetAction,
  likeTweet as likeTweetAction,
  retweetTweet as retweetTweetAction,
  toggleBookmark as toggleBookmarkAction,
} from '../store/slices/tweetSlice'

export function useTweets() {
  const dispatch = useDispatch()
  const { tweets, loading, error } = useSelector((state) => state.tweets)

  const addTweet = (tweet) => dispatch(addTweetAction(tweet))
  const likeTweet = (tweetId) => dispatch(likeTweetAction(tweetId))
  const retweetTweet = (tweetId) => dispatch(retweetTweetAction(tweetId))
  const toggleBookmark = (tweetId) => dispatch(toggleBookmarkAction(tweetId))
  const addReply = (tweetId, reply) => dispatch(addReplyAction({ tweetId, reply }))
  const deleteTweet = (tweetId) => dispatch(deleteTweetAction(tweetId))

  return { tweets, loading, error, addTweet, likeTweet, retweetTweet, toggleBookmark, addReply, deleteTweet }
}
