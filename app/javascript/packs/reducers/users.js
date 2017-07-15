import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT: {
      if (!action.payload.included) {
        return state;
      }

      const users = action.payload.included.filter(data => data.type === 'users');
      return users.map(u => u.id);

    }

    case types.FETCH_USERS_RESULT:
      return action.payload.data.map(u => u.id);

    case types.FETCH_MESSAGE_THREAD_RESULT: {
      const users = action.payload.included.filter(data => data.type === 'users');
      return users.reduce((nextState, u) => {
        if (nextState.indexOf(u.id) === -1) {
          nextState.push(u.id);
        }
        return nextState;
      }, [...state]);
    }

    case types.ADD_USER_TO_NEW_MESSAGE_THREAD:
      if (state.indexOf(action.user.id) === -1) {
        return state.concat(action.user.id);
      }
      return state;

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT: {
      if (!action.payload.included) {
        return state;
      }

      const users = action.payload.included.filter(data => data.type === 'users');
      return users.reduce((nextState, u) => {
        nextState[u.id] = u.attributes;
        return nextState;
      }, { ...state });
    }

    case types.FETCH_USERS_RESULT:
      return action.payload.data.reduce((nextState, u) => {
        console.log('u', u);
        nextState[u.id] = u.attributes;
        return nextState;
      }, { ...state });

    case types.FETCH_MESSAGE_THREADS_RESULT: {
      const users = action.payload.included.filter(data => data.type === 'users');
      return users.reduce((nextState, u) => {
        nextState[u.id] = u.attributes;
        return nextState;
      }, { ...state });
    }

    case types.ADD_USER_TO_NEW_MESSAGE_THREAD:
      const { id, ...attributes } = action.user;
      return {
        ...state,
        [id]: attributes,
      };

    default:
      return state;
  }
};

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.FETCH_USERS_START:
      return true;

    case types.FETCH_USERS_RESULT:
      return false;

    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
  isFetching,
});

/*** Selectors ***/
export const getUserById = (state, id) => {
  return { ...state.byId[id], id };
}
