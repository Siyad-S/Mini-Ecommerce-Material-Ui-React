import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slices/adminSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    user: userSlice
  },
})