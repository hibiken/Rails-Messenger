import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSidebar from '../components/main_sidebar';
// import { fetchUsers } from '../actions/users';
import { 
  fetchMessageThreads,
  fetchOrCreateMessageThreadByUserIds,
} from '../actions/message_threads';
import * as Selectors from '../reducers';

class MainSidebarContainer extends Component {
  componentDidMount() {
    console.log('fetching message threads...');
    this.props.fetchMessageThreads();
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
});

export default connect(
  mapStateToProps,
  {
    fetchMessageThreads,
    fetchOrCreateMessageThreadByUserIds,
  }
)(MainSidebarContainer);
