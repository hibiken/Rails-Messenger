import { combineReducers } from 'redux';
import users, * as fromUsers from './users';
import messageThreads from './message_threads';

export default combineReducers({
  users,
  messageThreads,
});

/*** Selectors ***/
export const getAllUsers = (state) => {
  return fromUsers.getAllUsers(state.users);
};

