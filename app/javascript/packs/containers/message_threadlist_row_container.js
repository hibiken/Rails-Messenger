import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageThreadlistRow from '../components/message_threadlist_row';
import { setActiveThread, fetchMessagesFor } from '../actions/message_threads';
import { markAsSeen } from '../api/message_threads';

const mapDispatchToProps = (dispatch, { messageThreadId }) => ({
  onClick: () => {
    markAsSeen(messageThreadId);
    dispatch(setActiveThread(messageThreadId));
    dispatch(fetchMessagesFor(messageThreadId));
  },
});

export default connect(null, mapDispatchToProps)(MessageThreadlistRow);
