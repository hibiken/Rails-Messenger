import axios from '../initializers/axios';

export const typingMessageStarted = (messageThreadId) => {
  return axios({
    method: 'post',
    url: `/message_threads/${messageThreadId}/user_typings/started`,
  });
};

export const typingMessageStopped = (messageThreadId) => {
  return axios({
    method: 'post',
    url: `/message_threads/${messageThreadId}/user_typings/stopped`,
  });
};
