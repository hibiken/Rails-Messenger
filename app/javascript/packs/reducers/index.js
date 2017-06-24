import { combineReducers } from 'redux';
import currentUser, * as fromCurrentUser from './current_user';
import users, * as fromUsers from './users';
import messageThreads, * as fromMessageThreads from './message_threads';
import messages, * as fromMessages from './messages';

export default combineReducers({
  currentUser,
  users,
  messageThreads,
  messages,
});

/*** Selectors ***/
export const getCurrentUserId = (state) => {
  return fromCurrentUser.getId(state.currentUser);
};

export const getAllUsers = (state) => {
  return fromUsers.getAllUsers(state.users);
};

export const getUsersByIds = (state, userIds) => {
  return fromUsers.getUsersByIds(state.users, userIds);
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

export const getActiveMessageThread = (state) => {
  const activeThread = fromMessageThreads.getActiveMessageThread(state.messageThreads);
  if (activeThread === false) {
    return false;
  }

  return {
    ...activeThread,
    messages: fromMessages.getMessagesByIds(state.messages, activeThread.messageIds),
    receivers: fromUsers.getUsersByIds(state.users, activeThread.receiverIds),
  };
};

export const getNextMessagesLinkFor = (state, messageThreadId) => {
  return fromMessageThreads.getNextLinkById(state.messageThreads, messageThreadId);
};

