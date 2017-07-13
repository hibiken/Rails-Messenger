import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  active: false,
  users: [],
  messageThread: {},
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
    default:
      return state;
  }
};

export default combineReducers({
  active,
  users,
  messageThread,
});

