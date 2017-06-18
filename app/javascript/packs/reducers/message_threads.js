import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
  usersById: {},
  isFetching: false,
};

const allIds = (state= initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      return action.payload.data.map(m => m.id);

    case types.FETCH_MESSAGE_THREAD_RESULT:
      return [...state, action.payload.data.id];

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      return action.payload.data.reduce((nextState, m) => {
        nextState[m.id] = m.attributes;
        return nextState;
      }, { ...state });

    case types.FETCH_MESSAGE_THREAD_RESULT:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data.attributes,
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

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_START:
    case types.FETCH_MESSAGE_THREAD_START:
      return true;

    case types.FETCH_MESSAGE_THREADS_RESULT:
    case types.FETCH_MESSAGE_THREAD_RESULT:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  usersById,
  isFetching,
});
