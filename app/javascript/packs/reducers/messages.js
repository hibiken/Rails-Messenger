import { combineReducers } from 'redux';
import * as types from '../actions/types';
import _ from 'lodash';

const initialState = {
  allIds: [],
  byId: {},
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGES_RESULT:
      return action.payload.data.reduce((nextState, m) => {
        if (nextState.indexOf(m.id) === -1) {
          nextState.push(m.id);
        }
        return nextState;
      }, [...state]);

    case types.MESSAGE_SAVE_START:
      return [ ...state, action.tempId ];

    case types.RECEIVED_MESSAGE:
      const filteredState = state.filter(id => id !== action.payload.tempId);
      return [ ...filteredState, action.payload.data.id];

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGES_RESULT:
      return action.payload.data.reduce((nextState, m) => {
        nextState[m.id] = m.attributes;
        return nextState;
      }, { ...state });

    case types.MESSAGE_SAVE_START:
      return {
        ...state,
        [action.tempId]: action.message,
      };

    case types.MESSAGE_SAVE_FAILURE:
      return {
        ...state,
        [action.tempId]: {
          ...state[action.tempId],
          error: true,
        },
      };

    case types.RECEIVED_MESSAGE:
      const { tempId } = action.payload;
      const { id, attributes } = action.payload.data;
      delete state[tempId];

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

