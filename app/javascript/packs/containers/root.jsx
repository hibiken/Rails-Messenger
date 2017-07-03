import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Dashboard from './dashboard';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Dashboard />
    </ConnectedRouter>
  </Provider>
);

export default Root;
