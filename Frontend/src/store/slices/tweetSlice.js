import { createSlice } from '@reduxjs/toolkit'
import { dummyTweets } from '../../data/dummyData.js'

export const sampleTweets = dummyTweets

const initialState = {
  tweets: dummyTweets,
  currentTweet: {},
  loading: false,
  error: '',
}

const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    fetchTweetsStart: (state) => { state.loading = true; state.error = '' },
    fetchTweetsSuccess: (state, action) => { state.tweets = action.payload; state.loading = false; state.error = '' },
    fetchTweetsFailure: (state, action) => { state.loading = false; state.error = action.payload },
    addTweet: (state, action) => { state.tweets.unshift(action.payload) },
    likeTweet: (state, action) => {
      const tweet = state.tweets.find((item) => item.id === action.payload)
      if (tweet) { tweet.likedByCurrentUser = !tweet.likedByCurrentUser; tweet.likes += tweet.likedByCurrentUser ? 1 : -1 }
    },
    retweetTweet: (state, action) => {
      const tweet = state.tweets.find((item) => item.id === action.payload)
      if (tweet) { tweet.retweetedByCurrentUser = !tweet.retweetedByCurrentUser; tweet.retweets += tweet.retweetedByCurrentUser ? 1 : -1 }
    },
    toggleBookmark: (state, action) => {
      const tweet = state.tweets.find((item) => item.id === action.payload)
      if (tweet) tweet.bookmarkedByCurrentUser = !tweet.bookmarkedByCurrentUser
    },
    addReply: (state, action) => {
      const { tweetId, reply } = action.payload
      const tweet = state.tweets.find((item) => item.id === tweetId)
      if (tweet) tweet.replies = [...(tweet.replies || []), reply]
    },
    deleteTweet: (state, action) => {
      state.tweets = state.tweets.filter((tweet) => tweet.id !== action.payload)
      if (state.currentTweet.id === action.payload) state.currentTweet = {}
    },
  },
})

export const { fetchTweetsStart, fetchTweetsSuccess, fetchTweetsFailure, addTweet, likeTweet, retweetTweet, toggleBookmark, addReply, deleteTweet } = tweetSlice.actions
export default tweetSlice.reducer
