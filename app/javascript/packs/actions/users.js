import axios from 'axios';
import * as types from './types';

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: types.FETCH_USERS_START });

  return axios.get('http://localhost:3000/users')
    .then(({ data })=> {
      dispatch({
        type: types.FETCH_USERS_RESULT,
        payload: data,
      });
    });
};
