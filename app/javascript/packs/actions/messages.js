import axios from '../initializers/axios';
import * as types from './types';

export const createMessage = (messageThreadId, message) => (dispatch) => {
  return axios({
    method: 'post',
    url: `/message_threads/${messageThreadId}/messages`,
    data: {
      message: {
        body: message.body,
      },
    },
  }).then(({ data }) => {
    console.log('successfully created message', data);
  });
};
