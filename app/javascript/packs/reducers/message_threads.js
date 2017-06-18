import { combineReducers } from 'redux';
import * as types from '../actions/types';

const initialState = {
  allIds: [],
  byId: {},
  isFetching: false,
};

const allIds = (state= initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_RESULT:
      return [...state, action.payload.data.id];

    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_RESULT:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data.attributes,
      };

    default:
      return state;
  }
};

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.FETCH_MESSAGE_THREAD_START:
      return true;

    case types.FETCH_MESSAGE_THREAD_RESULT:
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
