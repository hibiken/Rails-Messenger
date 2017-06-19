import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageDetailView from '../components/message_detail_view';
import { getActiveMessageThread } from '../reducers';
import { createMessage } from '../actions/messages';

const mapStateToProps = (state) => {
  const activeThread = getActiveMessageThread(state);

  if (activeThread === false) {
    return { usernames: [], messages: [], messageable: false, messageThreadId: null };
  }

  return {
    usernames: activeThread.receivers.map(r => r.username),
    messages: activeThread.messages,
    messageable: true,
    messageThreadId: activeThread.id,
  };
};

export default connect(mapStateToProps, { createMessage })(MessageDetailView);




