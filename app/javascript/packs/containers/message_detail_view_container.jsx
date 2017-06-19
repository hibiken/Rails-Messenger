import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageDetailView from '../components/message_detail_view';
import { getActiveMessageThread } from '../reducers';

const mapStateToProps = (state) => {
  const activeThread = getActiveMessageThread(state);

  if (activeThread === false) {
    return { usernames: [], messages: [] };
  }

  return {
    usernames: activeThread.receivers.map(r => r.username),
    messages: activeThread.messages,
  };
};

export default connect(mapStateToProps, null)(MessageDetailView);




