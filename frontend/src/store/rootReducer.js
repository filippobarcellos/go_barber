import { combineReducers } from 'redux-immer';
import produce from 'immer';

import auth from './Auth/reducer';

export default combineReducers(produce, {
  auth,
});
