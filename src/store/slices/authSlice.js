import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: {
    id: '',
    name: '',
    username: '',
    email: '',
    avatar: '',
    bio: '',
    coverPhoto: '',
    followers: 0,
    following: 0,
    followingUsers: [],
    joinedDate: '',
    location: '',
    website: '',
    preferences: {
      privateAccount: false,
      emailNotifications: true,
      pushNotifications: true,
      sensitiveMedia: false,
    },
    passwordChangedAt: '',
  },
  token: '',
  loading: false,
  error: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = ''
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
      state.error = ''
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false
      state.loading = false
      state.error = action.payload
    },
    logout: () => initialState,
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    updatePreferences: (state, action) => {
      state.user.preferences = { ...state.user.preferences, ...action.payload }
    },
    passwordChanged: (state) => {
      state.user.passwordChangedAt = new Date().toISOString()
    },
    toggleFollowing: (state, action) => {
      const userId = action.payload
      const followed = state.user.followingUsers || []
      if (followed.includes(userId)) {
        state.user.followingUsers = followed.filter((id) => id !== userId)
        state.user.following = Math.max(0, (state.user.following || 0) - 1)
      } else {
        state.user.followingUsers = [...followed, userId]
        state.user.following = (state.user.following || 0) + 1
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, updatePreferences, passwordChanged, toggleFollowing } = authSlice.actions
export default authSlice.reducer
