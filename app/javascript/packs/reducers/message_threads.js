import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
  usersById: {},
  messagesById: {},
  activeThreadId: null,
  isFetching: false,
  linksById: {},
};

const messageThreadInitialState = {
  uIds: [],
  receiverIds: [],
  typingUserIds: [],
  allMessagesFetched: false,
  isFetching: false,
};

const allIds = (state= initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      return action.payload.data.map(m => m.id);

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      return action.payload.data.reduce((nextState, m) => {
        nextState[m.id] = {
          ...messageThreadInitialState,
          ...m.attributes,
        };
        return nextState;
      }, { ...state });

    case types.FETCH_MESSAGES_START:
      return {
        ...state,
        [action.messageThreadId]: {
          ...state[action.messageThreadId],
          isFetching: true,
        },
      };

    case types.FETCH_MESSAGES_RESULT: {
      const { links } = action.payload;
      return {
        ...state,
        [action.messageThreadId]: {
          ...state[action.messageThreadId],
          allMessagesFetched: !links.next,
          isFetching: false,
        },
      };
    }

    case types.USER_TYPING_STARTED: {
      const { typingUserIds } = state[action.messageThreadId];
      const newTypingUserIds = typingUserIds.indexOf(action.userId) === -1 ?
        [...typingUserIds, action.userId] : typingUserIds;
      return {
        ...state,
        [action.messageThreadId]: {
          ...state[action.messageThreadId],
          typingUserIds: newTypingUserIds,
        },
      };
    }

    case types.USER_TYPING_STOPPED: {
      const { typingUserIds } = state[action.messageThreadId];
      const newTypingUserIds = typingUserIds.filter(id => id !== action.userId);
      return {
        ...state,
        [action.messageThreadId]: {
          ...state[action.messageThreadId],
          typingUserIds: newTypingUserIds,
        },
      };
    }

    case types.RECEIVED_MESSAGE: {
      const messageThreadId = action.payload.data.relationships.messageThread.data.id;
      return {
        ...state,
        [messageThreadId]: {
          ...state[messageThreadId],
          typingUserIds: [],
          lastMessage: { ...action.payload.data.attributes, id: action.payload.data.id },
          updatedAt: action.payload.messageThreadUpdatedAt,
        },
      };
    }

    case types.MESSAGE_THREAD_SEEN:
      return {
        ...state,
        [action.messageThreadId]: {
          ...state[action.messageThreadId],
          lastSeenMessageIdsByUserId: action.lastSeenMessageIdsByUserId,
        },
      };

    default:
      return state;
  }
};

const usersById = (state = initialState.usersById, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      return action.payload.data.reduce((nextState, m) => {
        nextState[m.id] = m.relationships.users.data.map(u => u.id);
        return nextState;
      }, { ...state });

    default:
      return state;
  }
};

const messagesById = (state = initialState.messagesById, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGES_RESULT: {
      const prevMessageIds = state[action.messageThreadId] || [];
      return {
        ...state,
        [action.messageThreadId]: action.payload.data.reduce((nextState, m) => {
          if (nextState.indexOf(m.id) === -1) {
            nextState.push(m.id);
          }
          return nextState;
        }, [...prevMessageIds])
      };
    }

    case types.MESSAGE_SAVE_START:
      return {
        ...state,
        [action.messageThreadId]: [ ...state[action.messageThreadId], action.tempId ],
      };

    case types.RECEIVED_MESSAGE:
      const messageThreadId = action.payload.data.relationships.messageThread.data.id;
      if (state[messageThreadId]) {
        const filteredIds = state[messageThreadId].filter(id => id !== action.payload.tempId);
        return {
          ...state,
          [messageThreadId]: [ ...filteredIds, action.payload.data.id ],
        };
      } else {
        return {
          ...state,
          [messageThreadId]: [action.payload.data.id ],
        };
      }

    default:
      return state;
  }
};

const activeThreadId = (state = initialState.activeThreadId, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_MESSAGE_THREAD:
      return action.id;
    default:
      return state;
  }
};

const linksById = (state = initialState.linksById, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGES_RESULT:
      return {
        ...state,
        [action.messageThreadId]: action.payload.links,
      };

    default:
      return state;
  }
};

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_START:
      return true;

    case types.FETCH_MESSAGE_THREADS_RESULT:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  usersById,
  messagesById,
  activeThreadId,
  linksById,
  isFetching,
});

/*** Selectors ***/
const recentFirst = (messageThread1, messageThread2) => {
  const one = new Date(messageThread1.updatedAt);
  const two = new Date(messageThread2.updatedAt);
  return one > two ? -1 : 1;
}

export const getAllMessageThreads = (state) => {
  const { allIds, byId } = state;
  return allIds.map(id => ({
    ...byId[id],
    id
  })).sort(recentFirst);
};

export const getMessageThreadById = (state, messageThreadId) => {
  return state.byId[messageThreadId] || false;
};

export const getActiveMessageThread = (state) => {
  const { activeThreadId, byId, messagesById } = state;
  return activeThreadId === null ?
    false : {
      ...byId[activeThreadId],
      id: activeThreadId,
      messageIds: (messagesById[activeThreadId] || []),
    };
};

export const getActiveThreadId = (state) => state.activeThreadId;

export const getLinksById = (state, messageThreadId) => {
  const { linksById } = state;
  return linksById[messageThreadId] || {};
};

export const getNextLinkById = (state, messageThreadId) => {
  const links = getLinksById(state, messageThreadId);
  return links.next || '';
};

export const getMostRecentMessageThreadId = (state) => {
  const messageThreads = getAllMessageThreads(state);
  return messageThreads.length > 0 ? messageThreads[0].id : false;
};
