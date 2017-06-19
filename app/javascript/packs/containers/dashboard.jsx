import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainSidebarContainer from './main_sidebar_container';
import MessageDetailViewContainer from './message_detail_view_container';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard__root">
        <MainSidebarContainer />
        <MessageDetailViewContainer />
      </div>
    );
  }
}

export default Dashboard;
