import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });
    return response.data;
  }
);

const auth = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export default auth.reducer;
