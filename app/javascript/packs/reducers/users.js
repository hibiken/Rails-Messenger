import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      if (!action.payload.included) {
        return state;
      }

      const users = action.payload.included.filter(data => data.type === 'users');
      return users.map(u => u.id);

    case types.FETCH_USERS_RESULT:
      return action.payload.data.map(u => u.id);

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREADS_RESULT:
      if (!action.payload.included) {
        return state;
      }

      const users = action.payload.included.filter(data => data.type === 'users');
      return users.reduce((nextState, u) => {
        nextState[u.id] = u.attributes;
        return nextState;
      }, { ...state });

    case types.FETCH_USERS_RESULT:
      return action.payload.data.reduce((nextState, u) => {
        console.log('u', u);
        nextState[u.id] = u.attributes;
        return nextState;
      }, { ...state });

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

export const getAllUsers = (state) => {
  const { allIds, byId } = state;
  return allIds.map(id => ({ ...byId[id], id }));
};


export const getUsersByIds = (state, ids) => {
  const { byId } = state;
  return ids.map(id => ({ ...byId[id], id }));
};

export const getUserById = (state, id) => {
  return { ...state.byId[id], id };
}
