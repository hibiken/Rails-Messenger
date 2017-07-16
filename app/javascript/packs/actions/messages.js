import moment from 'moment';
import axios from '../initializers/axios';
import { push } from 'react-router-redux';
import * as types from './types';
import { getCurrentUser } from '../selectors';
import { uniqueId } from '../utils';

export const createMessage = (messageThreadId, message) => (dispatch, getState) => {
  const currentUser = getCurrentUser(getState());
  const tempId = `temp_${currentUser.id}_${uniqueId()}`;

  dispatch({
    type: types.MESSAGE_SAVE_START,
    messageThreadId,
    tempId,
    message: {
      ...message,
      userId: currentUser.id,
      avatarUrl: currentUser.avatarUrl,
      username: currentUser.username,
      createdAt: moment().format(),
      persisted: false,
    },
  });
  dispatch(push(`/t/${messageThreadId}`));

  return axios({
    method: 'post',
    url: `/message_threads/${messageThreadId}/messages`,
    data: {
      message: {
        body: message.body,
        temp_id: tempId,
        createdAt: new Date(),
      },
    },
  }).then(Function.prototype, (errors) => {
    dispatch({
      type: types.MESSAGE_SAVE_FAILURE,
      tempId,
    });
  });
};

