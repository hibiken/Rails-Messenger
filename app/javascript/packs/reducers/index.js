import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import currentUser, * as fromCurrentUser from './current_user';
import users, * as fromUsers from './users';
import messageThreads, * as fromMessageThreads from './message_threads';
import messages from './messages';
import newMessageThread from './new_message_thread';

export default combineReducers({
  currentUser,
  users,
  messageThreads,
  messages,
  newMessageThread,
  router,
});

/*** Non Memoized Selectors ***/
export const getUserById = (state, userId) => {
  return fromUsers.getUserById(state.users, userId);
};

export const getMessageThreadById = (state, messageThreadId) => {
  return fromMessageThreads.getMessageThreadById(state.messageThreads, messageThreadId);
};

export const getNextMessagesLinkFor = (state, messageThreadId) => {
  return fromMessageThreads.getNextLinkById(state.messageThreads, messageThreadId);
};
