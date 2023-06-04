import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

const initialState = {
  token: localStorage.getItem('token') || sessionStorage.getItem('token'),
  user: null,
  error: null,
};

// ===========================================================================

export const checkToken = createAsyncThunk('auth/create', async () => {
  return await AuthService.checkToken(initialState.token);
});

// ===========================================================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [checkToken.fulfilled]: (state, action) => {
      console.log({ state, action });
      if (action.payload) {
        state.user = action.payload;
      }
    },
  },
});
const { reducer } = authSlice;
export default reducer;
