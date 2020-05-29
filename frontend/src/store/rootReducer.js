import { combineReducers } from '@reduxjs/toolkit';

import auth from './Auth/authSlice';
import user from './User/userSlice';

export default combineReducers({
  auth,
  user,
});
