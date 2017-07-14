import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  active: false,
  users: [],
  messageThread: null,
  isFetching: false,
};

const active = (state = initialState.active, action) => {
  switch (action.type) {
    case types.START_ADDING_NEW_MESSAGE_THREAD:
      return true;
    default:
      return state;
  }
};

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case types.ADD_USER_TO_NEW_MESSAGE_THREAD:
      return state.concat(action.user);
    case types.REMOVE_LAST_USER_FROM_NEW_MESSAGE_THREAD:
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
};

const messageThread = (state = initialState.messageThread, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_RESULT:
      const { data: { id, attributes, relationships } } = action.payload;
      return {
        id,
        ...attributes,
        messageIds: relationships.messages.data.map(m => m.id),
        userIds: relationships.users.data.map(u => u.id),
        typingUserIds: [],
        isFetching: false,
        allMessagesFetched: false,
      };

    default:
      return state;
  }
};

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_START:
      return true;
    case types.FETCH_MESSAGE_THREAD_RESULT:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  active,
  users,
  messageThread,
  isFetching,
});

