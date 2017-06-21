import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const configureStore = (initialState = {}) => {
  let middleware = applyMiddleware(thunk, logger);

  if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    const devtools = window.devToolsExtension();
    middleware = compose(middleware, devtools);
  }

  const store = createStore(rootReducer, initialState, middleware);

  return store;
};

export default configureStore;
