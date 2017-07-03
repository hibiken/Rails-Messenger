import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import camelMiddleware from 'redux-camel';
import rootReducer from '../reducers';

const configureStore = (initialState = {}, history) => {
  let middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
    camelMiddleware({ global: false }),
    logger
  );

  if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
    const devtools = window.devToolsExtension();
    middleware = compose(middleware, devtools);
  }

  const store = createStore(rootReducer, initialState, middleware);

  return store;
};

export default configureStore;
