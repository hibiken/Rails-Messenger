import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  active: false,
  users: [],
  messageThread: {},
};

const active = (state = initialState.active, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const users = (state = initialState.users, action) => {
  switch (action.type) {
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

