import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainSidebarContainer from './main_sidebar_container';
import MessageDetailView from '../components/message_detail_view';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard__root">
        <MainSidebarContainer />
        <MessageDetailView />
      </div>
    );
  }
}

export default Dashboard;
