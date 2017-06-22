import axios from '../initializers/axios';
import * as types from './types';
import { getCurrentUserId } from '../reducers';
import { uniqueId } from '../utils';

export const createMessage = (messageThreadId, message) => (dispatch, getState) => {
  const currentUserId = getCurrentUserId(getState());
  const tempId = `temp_${currentUserId}_${uniqueId()}`;
  dispatch({
    type: types.MESSAGE_SAVE_START,
    messageThreadId,
    tempId,
    message: {
      ...message,
      userId: currentUserId,
      persisted: false,
    },
  });

  return axios({
    method: 'post',
    url: `/message_threads/${messageThreadId}/messages`,
    data: {
      message: {
        body: message.body,
        temp_id: tempId,
      },
    },
  }).then(Function.prototype, (errors) => {
    dispatch({
      type: types.MESSAGE_SAVE_FAILURE,
      tempId,
    });
  });
};
