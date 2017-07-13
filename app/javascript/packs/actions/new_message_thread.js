import { push } from 'react-router-redux';
import * as types from './types';

export const addNewMessageThread = () => (dispatch) => {
  dispatch(push('/new'));
  dispatch({ type: types.START_ADDING_NEW_MESSAGE_THREAD });
};
