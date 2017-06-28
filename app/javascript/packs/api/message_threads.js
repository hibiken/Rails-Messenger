import axios from '../initializers/axios';

export const markAsSeen = (messageThreadId) => {
  return axios({
    method: 'post',
    url: `/message_threads/${messageThreadId}/seen`,
  });
};

