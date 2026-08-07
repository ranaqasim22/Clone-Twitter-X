import { useDispatch, useSelector } from 'react-redux'
import {
  addTweet as addTweetAction,
  deleteTweet as deleteTweetAction,
  likeTweet as likeTweetAction,
  retweetTweet as retweetTweetAction,
} from '../store/slices/tweetSlice'

export function useTweets() {
  const dispatch = useDispatch()
  const { tweets, loading, error } = useSelector((state) => state.tweets)

  const addTweet = (tweet) => dispatch(addTweetAction(tweet))
  const likeTweet = (tweetId) => dispatch(likeTweetAction(tweetId))
  const retweetTweet = (tweetId) => dispatch(retweetTweetAction(tweetId))
  const deleteTweet = (tweetId) => dispatch(deleteTweetAction(tweetId))

  return { tweets, loading, error, addTweet, likeTweet, retweetTweet, deleteTweet }
}
