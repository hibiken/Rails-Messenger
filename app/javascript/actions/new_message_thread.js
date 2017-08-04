import axios from '../initializers/axios';
import { push } from 'react-router-redux';
import * as types from './types';
import { getMostRecentMessageThreadId } from '../selectors';

export const addNewMessageThread = () => (dispatch) => {
  dispatch(push('/new'));
  dispatch({ type: types.START_ADDING_NEW_MESSAGE_THREAD });
};

export const cancelNewMessageThread = () => (dispatch, getState) =>  {
  const mostRecentMessageThreadId = getMostRecentMessageThreadId(getState());
  dispatch({ type: types.CANCEL_ADDING_NEW_MESSAGE_THREAD });
  dispatch(push(`/t/${mostRecentMessageThreadId}`));
};

export const addUserToNewMessageThread = (user) => ({
  type: types.ADD_USER_TO_NEW_MESSAGE_THREAD,
  user,
});

export const removeLastUserFromNewMessageThread = () => ({
  type: types.REMOVE_LAST_USER_FROM_NEW_MESSAGE_THREAD,
})

export const fetchMessageThread = (userIds) => (dispatch) => {
  dispatch({ type: types.FETCH_MESSAGE_THREAD_START });

  return axios({
    method: 'post',
    url: '/message_threads',
    data: {
      message_thread: {
        user_ids: userIds,
      },
    },
  }).then(({ data }) => {
    dispatch({
      type: types.FETCH_MESSAGE_THREAD_RESULT,
      payload: data,
    });
  });
}
