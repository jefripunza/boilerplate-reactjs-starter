import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthService from '../services/AuthService';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
};

// ===========================================================================

export const checkToken = createAsyncThunk('auth/create', async () => {
  return await AuthService.checkToken(initialState.token);
});

export const otpValidate = createAsyncThunk('auth/otp-validate', async ({ mode, otp_secret, otp_code }) => {
  return await AuthService.otpValidation(mode, otp_secret, otp_code);
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return await AuthService.logout();
});

// ===========================================================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [checkToken.fulfilled]: (state, action) => {
      const [is_error, value] = action.payload;
      if (is_error) {
        return state;
      } else {
        state.user = value;
      }
    },
    [otpValidate.fulfilled]: (state, action) => {
      const [is_error, token] = action.payload;
      if (!is_error) {
        localStorage.setItem('token', token);
        state.token = token;
      }
    },
    [logout.fulfilled]: (state, action) => {
      const [is_error, _] = action.payload;
      if (!is_error) {
        localStorage.removeItem('token');
        state.token = null;
      }
    },
  },
});
const { reducer } = authSlice;
export default reducer;
