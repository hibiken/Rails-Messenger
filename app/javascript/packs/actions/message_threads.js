import axios from '../initializers/axios';
import { push } from 'react-router-redux';
import * as types from './types';
import { getNextMessagesLinkFor, getMessageThreadById } from '../reducers';

export const fetchMessageThreads = () => (dispatch) => {
  dispatch({ type: types.FETCH_MESSAGE_THREADS_START });

  return axios.get('/message_threads')
    .then(({ data }) => {
      dispatch({
        type: types.FETCH_MESSAGE_THREADS_RESULT,
        payload: data,
        camelCase: true,
      });
    })
};

export const fetchMessagesFor = (messageThreadId) => (dispatch, getState) => {
  const messageThread = getMessageThreadById(getState(), messageThreadId);
  if (messageThread && messageThread.allMessagesFetched) {
    return;
  }

  dispatch({ type: types.FETCH_MESSAGES_START, messageThreadId });

  const nextLink = getNextMessagesLinkFor(getState(), messageThreadId) ||
                   `message_threads/${messageThreadId}/messages`;

  return axios.get(nextLink)
    .then(({ data }) => {
      dispatch({
        type: types.FETCH_MESSAGES_RESULT,
        payload: data,
        messageThreadId,
      });
    });
};

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

export const setActiveThread = (id) => (dispatch) => {
  dispatch(push(`/t/${id}`));
};

