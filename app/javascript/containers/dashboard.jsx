import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  fetchMessageThreads,
  setActiveThread,
  fetchMessagesFor,
} from '../actions/message_threads';
import {
  getAllMessageThreads,
  getMostRecentMessageThreadId,
  getActiveMessageThreadId,
  getIsAddingNewThread,
  getIsNewThreadActive,
  getNewMessageThreadUsers,
} from '../selectors';
import MainSidebarContainer from './main_sidebar_container';
import MessageDetailViewContainer from './message_detail_view_container';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchMessageThreads()
      .then(() => {
        const { activeThreadId, mostRecentThreadId } = this.props;
        if (activeThreadId !== null) {
          this.props.setActiveThread(activeThreadId);
          this.props.fetchMessagesFor(activeThreadId);
          return;
        }

        if (mostRecentThreadId !== false) {
          this.props.setActiveThread(mostRecentThreadId);
          this.props.fetchMessagesFor(mostRecentThreadId);
        }
      });
  }

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

const mapStateToProps = (state) => ({
  isAddingNewThread: getIsAddingNewThread(state),
  isNewThreadActive: getIsNewThreadActive(state),
  newMessageThreadUsers: getNewMessageThreadUsers(state),
  messageThreads: getAllMessageThreads(state),
  activeThreadId: getActiveMessageThreadId(state),
  mostRecentThreadId: getMostRecentMessageThreadId(state),
});

export default connect(
  mapStateToProps,
  {
    fetchMessageThreads,
    setActiveThread,
    fetchMessagesFor,
  }
)(Dashboard);
