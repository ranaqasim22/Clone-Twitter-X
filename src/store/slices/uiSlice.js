import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  theme: 'dark',
  modalOpen: false,
  modalContent: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    toggleTheme: (state) => { state.theme = state.theme === 'light' ? 'dark' : 'light' },
    openModal: (state, action) => { state.modalOpen = true; state.modalContent = action.payload },
    closeModal: (state) => { state.modalOpen = false; state.modalContent = '' },
  },
})

export const { toggleSidebar, toggleTheme, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer
