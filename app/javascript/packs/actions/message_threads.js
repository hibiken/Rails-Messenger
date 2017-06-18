import axios from '../initializers/axios';
import * as types from './types';

export const fetchOrCreateMessageThreadByUserIds = (userIds) => (dispatch) => {
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
};
