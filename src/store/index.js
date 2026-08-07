import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import tweetReducer from './slices/tweetSlice.js'
import uiReducer from './slices/uiSlice.js'
import messageReducer from './slices/messageSlice.js'

const storageKey = 'x-twitter-state'
const loadState = () => {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return undefined
    const parsed = JSON.parse(saved)
    // Supports settings saved by earlier versions, which contained auth only.
    return parsed.auth ? parsed : { auth: parsed }
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
    ui: uiReducer,
    messages: messageReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(() => {
  try {
    const { auth, tweets, messages } = store.getState()
    localStorage.setItem(storageKey, JSON.stringify({ auth, tweets, messages }))
  } catch {
    // The app still works when browser storage is unavailable.
  }
})
