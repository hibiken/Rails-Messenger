import { combineReducers } from 'redux';
import _ from 'lodash';
import moment from 'moment';
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

export const getMessageThreadById = (state, messageThreadId) => {
  return fromMessageThreads.getMessageThreadById(state.messageThreads, messageThreadId);
};

export const getActiveMessageThread = (state) => {
  const activeThread = fromMessageThreads.getActiveMessageThread(state.messageThreads);
  if (activeThread === false) {
    return false;
  }

  const groupedMessages = getGroupedMessagesByIds(state, activeThread.messageIds);
  console.log('groupedMessages', groupedMessages);

  return {
    ...activeThread,
    messages: fromMessages.getMessagesByIds(state.messages, activeThread.messageIds),
    receivers: fromUsers.getUsersByIds(state.users, activeThread.receiverIds),
    messageGroups: getGroupedMessagesByIds(state, activeThread.messageIds),
  };
};

export const getNextMessagesLinkFor = (state, messageThreadId) => {
  return fromMessageThreads.getNextLinkById(state.messageThreads, messageThreadId);
};

export const getGroupedMessagesByIds = (state, ids) => {
  const messages = fromMessages.getMessagesByIds(state.messages, ids);

  const newMessageGroup = (message) => ({
    userId: message.userId,
    avatarUrl: message.avatarUrl,
    createdAt: message.createdAt,
    messages: [{ body: message.body, createdAt: message.createdAt }],
  });

  const messageGroups = messages.reduce((msgGroups, m) => {
    if (msgGroups.length === 0) {
      return msgGroups.concat(newMessageGroup(m));
    }

    const lastMessageGroup = _.last(msgGroups);
    if (lastMessageGroup.userId !== m.userId) {
      return msgGroups.concat(newMessageGroup(m));
    }

    const lastMessage = _.last(lastMessageGroup.messages);
    if (moment(m.createdAt).isBefore(moment(lastMessage.createdAt).add(3, 'minutes'))) {
      lastMessageGroup.messages.push({ body: m.body, createdAt: m.createdAt });
      return msgGroups;
    } else {
      return msgGroups.concat(newMessageGroup(m));
    }
  }, []);
  return messageGroups;
};

