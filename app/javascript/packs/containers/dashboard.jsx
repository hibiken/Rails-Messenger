import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import MainSidebarContainer from './main_sidebar_container';
import MessageDetailViewContainer from './message_detail_view_container';

class Dashboard extends Component {
  render() {
    return (
      <Router>
        <div className="dashboard__root">
          <MainSidebarContainer />
          <MessageDetailViewContainer />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
