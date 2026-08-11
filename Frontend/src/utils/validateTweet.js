import { MAX_TWEET_LENGTH } from './constants'

export function validateTweet(content) {
  const text = typeof content === 'string' ? content.trim() : ''

  if (!text) {
    return { isValid: false, errorMessage: 'Tweet content cannot be empty.' }
  }

  if (text.length > MAX_TWEET_LENGTH) {
    return { isValid: false, errorMessage: `Tweet cannot exceed ${MAX_TWEET_LENGTH} characters.` }
  }

  return { isValid: true, errorMessage: '' }
}
