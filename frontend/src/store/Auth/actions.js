import api from '../../services/api';

export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILED = 'SIGNIN_FAILED';

export const signIn = ({ email, password }) => async (dispatch) => {
  try {
    const res = await api.post('/sessions', { email, password });

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: SIGNIN_FAILED });
  }
};
