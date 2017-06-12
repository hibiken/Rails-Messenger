import { createStore, applyMiddleware, componse } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const configureStore = (initialState = {}) => {
  const middleware = applyMiddleware(thunk, logger);

  const store = createStore(rootReducer, initialState, middleware);

  return store;
};

export default configureStore;
