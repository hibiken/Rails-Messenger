import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainSidebar from '../components/main_sidebar';

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

export default Dashboard;
