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

export const getUserById = (state, userId) => {
  return fromUsers.getUserById(state.users, userId);
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

export const getActiveMessageThreadId = (state) => {
  return fromMessageThreads.getActiveThreadId(state.messageThreads);
};

export const getActiveMessageThread = (state) => {
  const activeThread = fromMessageThreads.getActiveMessageThread(state.messageThreads);
  if (activeThread === false) {
    return false;
  }

  return {
    ...activeThread,
    messageCount: activeThread.messageIds.length,
    receivers: fromUsers.getUsersByIds(state.users, activeThread.receiverIds),
    messageGroups: getGroupedMessagesByIds(state, activeThread.messageIds),
  };
};

export const getMostRecentMessageThreadId = (state) => {
  return fromMessageThreads.getMostRecentMessageThreadId(state.messageThreads);
};

export const getNextMessagesLinkFor = (state, messageThreadId) => {
  return fromMessageThreads.getNextLinkById(state.messageThreads, messageThreadId);
};

export const getGroupedMessagesByIds = (state, ids) => {
  const messages = fromMessages.getSortedMessagesByIds(state.messages, ids);

  const newMessageGroup = (message) => ({
    userId: message.userId,
    avatarUrl: message.avatarUrl,
    username: message.username,
    createdAt: message.createdAt,
    messages: [newMessage(message)],
  });

  const newMessage = (message) => {
    return _.pick(message, ['id', 'body', 'createdAt', 'error', 'persisted']);
  };

  return messages.reduce((msgGroups, m) => {
    if (msgGroups.length === 0) {
      return msgGroups.concat(newMessageGroup(m));
    }

    const lastMessageGroup = _.last(msgGroups);
    if (lastMessageGroup.userId !== m.userId) {
      return msgGroups.concat(newMessageGroup(m));
    }

    const lastMessage = _.last(lastMessageGroup.messages);
    if (moment(m.createdAt).isBefore(moment(lastMessage.createdAt).add(3, 'minutes'))) {
      lastMessageGroup.messages.push(newMessage(m));
      return msgGroups;
    } else {
      return msgGroups.concat(newMessageGroup(m));
    }
  }, []);
};

