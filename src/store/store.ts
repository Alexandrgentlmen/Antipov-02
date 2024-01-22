import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './userSlice';
import { authSlice } from './authSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    usersList: usersSlice.reducer,
    auth: authSlice.reducer,
  },
});
