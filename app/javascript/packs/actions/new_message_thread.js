import { push } from 'react-router-redux';
import * as types from './types';

export const addNewMessageThread = () => (dispatch) => {
  dispatch(push('/new'));
  dispatch({ type: types.START_ADDING_NEW_MESSAGE_THREAD });
};

export const addUserToNewMessageThread = (user) => ({
  type: types.ADD_USER_TO_NEW_MESSAGE_THREAD,
  user,
});

export const removeLastUserFromNewMessageThread = () => ({
  type: types.REMOVE_LAST_USER_FROM_NEW_MESSAGE_THREAD,
})
