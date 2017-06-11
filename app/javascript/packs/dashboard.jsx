import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MainSidebar from './dashboard/main_sidebar';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard__root">
        Messenger Dashboard!
        <MainSidebar />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Dashboard name="Ken" />,
    document.body.appendChild(document.createElement('div')),
  );
});
