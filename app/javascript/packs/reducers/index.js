import { combineReducers } from 'redux';
import users, * as fromUsers from './users';
import messageThreads, * as fromMessageThreads from './message_threads';

export default combineReducers({
  users,
  messageThreads,
});

/*** Selectors ***/
export const getAllUsers = (state) => {
  return fromUsers.getAllUsers(state.users);
};

export const getAllMessageThreads = (state) => {
  const messageThreads = fromMessageThreads.getAllMessageThreads(state.messageThreads);
  return messageThreads.map(messageThread => {
    return {
      ...messageThread,
      receivers: fromUsers.getUsersByIds(state.users, messageThread.receiverIds),
    };
  });
};

