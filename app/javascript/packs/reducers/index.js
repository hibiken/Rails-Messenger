import { combineReducers } from 'redux';
import users, * as fromUsers from './users';

export default combineReducers({
  users,
});

/*** Selectors ***/
export const getAllUsers = (state) => {
  return fromUsers.getAllUsers(state.users);
};

