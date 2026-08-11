import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  conversations: [
    { id: 'maya', user: { id: 'u1', name: 'Maya Chen', username: 'mayacodes', avatar: 'https://i.pravatar.cc/150?img=47' }, updatedAt: '2026-08-06T09:48:00Z', messages: [{ id: 'm1', sender: 'them', text: 'The new design looks great. Nice work!', createdAt: '2026-08-06T09:48:00Z' }] },
    { id: 'jordan', user: { id: 'u2', name: 'Jordan Lee', username: 'jordanlee', avatar: 'https://i.pravatar.cc/150?img=12' }, updatedAt: '2026-08-06T08:50:00Z', messages: [{ id: 'm2', sender: 'them', text: 'Are you joining the call later?', createdAt: '2026-08-06T08:50:00Z' }] },
    { id: 'ava', user: { id: 'u3', name: 'Ava Patel', username: 'avapatel', avatar: 'https://i.pravatar.cc/150?img=32' }, updatedAt: '2026-08-05T16:00:00Z', messages: [{ id: 'm3', sender: 'them', text: 'Thanks for sharing that resource!', createdAt: '2026-08-05T16:00:00Z' }] },
  ],
}

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { conversationId, text } = action.payload
      const conversation = state.conversations.find((item) => item.id === conversationId)
      if (!conversation || !text.trim()) return
      const now = new Date().toISOString()
      conversation.messages.push({ id: globalThis.crypto?.randomUUID?.() || `message-${Date.now()}`, sender: 'me', text: text.trim(), createdAt: now })
      conversation.updatedAt = now
    },
    startConversation: (state, action) => {
      const user = action.payload
      const existing = state.conversations.find((item) => item.user.id === user.id)
      if (existing) return
      state.conversations.unshift({ id: `conversation-${user.id}`, user, updatedAt: new Date().toISOString(), messages: [] })
    },
  },
})

export const { sendMessage, startConversation } = messageSlice.actions
export default messageSlice.reducer
