import { SIGNIN_SUCCESS, SIGNIN_FAILED } from './actions';

const initialState = {
  token: null,
  isSigned: null,
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      state.token = payload.token;
      state.isSigned = true;
      state.loading = false;
      return state;
    case SIGNIN_FAILED:
      state.token = null;
      state.isSigned = false;
      state.loading = false;
      return state;
    default:
      return state;
  }
}
