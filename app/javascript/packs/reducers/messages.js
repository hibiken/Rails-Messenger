import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_RESULT:
      const messages = action.payload.included.filter(data => data.type === 'messages');
      return messages.reduce((nextState, m) => {
        if (nextState.indexOf(m.id) === -1) {
          nextState.push(m.id);
        }
        return nextState;
      }, [...state]);

    case types.RECEIVED_MESSAGE:
      if (state.indexOf(action.payload.id) === -1) {
        return [...state, action.payload.id];
      }
      return state;

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_RESULT:
      const messages = action.payload.included.filter(data => data.type === 'messages');
      return messages.reduce((nextState, m) => {
        nextState[m.id] = m.attributes;
        return nextState;
      }, { ...state });

    case types.RECEIVED_MESSAGE:
      const { id, ...attributes } = action.payload;
      return {
        ...state,
        [id]: attributes
      };

    default:
      return state;
  }
};

export default combineReducers({
  allIds,
  byId,
});

/*** Selectors ***/

export const getMessagesByIds = (state, ids) => {
  const { byId } = state;
  return ids.map(id => ({ ...byId[id], id }));
};
