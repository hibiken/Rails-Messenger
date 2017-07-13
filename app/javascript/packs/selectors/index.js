import { createSelector } from 'reselect';
import moment from 'moment';
import * as fromMessages from './messages';
import * as fromUsers from './users';
import * as fromMessageThreads from './message_threads';

/* CurrentUser */
export const getCurrentUser = state => state.currentUser;
export const getCurrentUserId = state => state.currentUser.id;

/* Users */
export const getAllUsers = fromUsers.getAll;

/* MessageThreads */
export const getAllMessageThreads = createSelector(
  fromMessageThreads.getAll,
  fromUsers.byId,
  (messageThreads, usersById) => {
    return messageThreads.map(mt => {
      const { receiverIds, ...rest } = mt;
      return {
        ...rest,
        receivers: receiverIds.map(id => usersById[id]),
      };
    });
  }
);

export const getMostRecentMessageThreadId = createSelector(
  fromMessageThreads.getAll,
  (messageThreads) => {
    return messageThreads.length > 0 ? messageThreads[0].id : false;
  }
);

/* ActiveThread */
const pathname = state => state.router.location.pathname;

export const getActiveMessageThreadId = createSelector(
  pathname,
  (pathname) => {
    const found = pathname.match(/^\/t\/(\d+)$/);
    if (found == null) {
      return null;
    }
    return found[1];
  }
);

const sortMessages = (messages) => {
  const recentLast = (message1, message2) => {
    const one = new Date(message1.createdAt);
    const two = new Date(message2.createdAt);
    return one > two ? 1 : -1;
  }

  return messages.sort(recentLast);
};

const groupedMessagesByCreatedAt = (messages) => {
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

const _getActiveThread = createSelector(
  getActiveMessageThreadId,
  fromMessageThreads.byId,
  fromMessageThreads.messagesById,
  (activeThreadId, byId, messagesById) => {
    return byId.hasOwnProperty(activeThreadId) ? {
      ...byId[activeThreadId],
      id: activeThreadId,
      messageIds: (messagesById[activeThreadId] || []),
    } : false;
  }
);

export const getActiveMessageThread = createSelector(
  _getActiveThread,
  fromUsers.byId,
  fromMessages.byId,
  (activeThread, usersById, messagesById) => {
    if (activeThread === false) {
      return false;
    }

    const receivers = activeThread.receiverIds.map(id => ({
      ...usersById[id],
      id,
    }));

    const typingUsers = activeThread.typingUserIds.map(id => ({
      ...usersById[id],
      id,
    }));

    const messages = activeThread.messageIds.map(id => ({
      ...messagesById[id],
      id,
    }));

    return {
      ...activeThread,
      messageCount: activeThread.messageIds.length,
      messageGroups: groupedMessagesByCreatedAt(sortMessages(messages)),
      receivers,
      typingUsers,
    };
  }
);

/* NewMessageThread */
export const getNewMessageThreadActive = state => state.newMessageThread.active;

export const getNewMessageThreadUsers = state => state.newMessageThread.users;

export const getNewMessageThreadUsernames = createSelector(
  getNewMessageThreadUsers,
  (users) => users.map(u => u.username)
);

