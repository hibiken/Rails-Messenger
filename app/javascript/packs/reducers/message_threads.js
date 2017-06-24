import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
  usersById: {},
  messagesById: {},
  activeThreadId: null,
  isFetching: false,
};

const messageThreadInitialState = {
  uIds: [],
  receiverIds: [],
  typingUserIds: [],
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

    case types.FETCH_MESSAGES_RESULT:
      return {
        ...state,
        [action.messageThreadId]: {
          ...state[action.messageThreadId],
          isFetching: false,
        },
      };

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
        },
      };
    }

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
    case types.FETCH_MESSAGES_RESULT:
      return {
        ...state,
        [action.messageThreadId]: action.payload.data.map(m => m.id),
      };

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
  isFetching,
});

/*** Selectors ***/
export const getAllMessageThreads = (state) => {
  const { allIds, byId } = state;
  return allIds.map(id => ({
    ...byId[id],
    id
  }));
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
