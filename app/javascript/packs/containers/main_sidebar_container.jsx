import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSidebar from '../components/main_sidebar';
import {
  fetchMessageThreads,
  fetchOrCreateMessageThreadByUserIds,
  setActiveThread,
  fetchMessagesFor,
} from '../actions/message_threads';
import * as Selectors from '../reducers';

class MainSidebarContainer extends Component {
  componentDidMount() {
    this.props.fetchMessageThreads()
      .then(() => {
        const { mostRecentThreadId } = this.props;
        if (mostRecentThreadId !== false) {
          this.props.setActiveThread(mostRecentThreadId);
          this.props.fetchMessagesFor(mostRecentThreadId);
        }
      });
  }


  render() {
    return (
      <MainSidebar
        messageThreads={this.props.messageThreads}
        activeThreadId={this.props.activeThreadId}
        fetchOrCreateMessageThreadByUserIds={this.props.fetchOrCreateMessageThreadByUserIds}
      />
    );
  }
};

const mapStateToProps = (state) => ({
  messageThreads: Selectors.getAllMessageThreads(state),
  activeThreadId: Selectors.getActiveMessageThreadId(state),
  mostRecentThreadId: Selectors.getMostRecentMessageThreadId(state),
});

export default connect(
  mapStateToProps,
  {
    fetchMessageThreads,
    fetchOrCreateMessageThreadByUserIds,
    setActiveThread,
    fetchMessagesFor,
  }
)(MainSidebarContainer);
