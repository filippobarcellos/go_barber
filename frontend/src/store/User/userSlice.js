import { createSlice } from '@reduxjs/toolkit';

import { signIn } from '../Auth/authSlice';

const user = createSlice({
  name: 'user',
  initialState: { profile: null },
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.profile = action.payload.user;
    },
  },
});

export default user.reducer;
