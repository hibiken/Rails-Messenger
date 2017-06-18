import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageThreadlistRow from '../components/message_threadlist_row';
import { fetchMessageThread, setActiveThread } from '../actions/message_threads';

const mapDispatchToProps = (dispatch, { messageThreadId }) => ({
  onClick: () => {
    dispatch(setActiveThread(messageThreadId));
    dispatch(fetchMessageThread(messageThreadId));
  },
});

export default connect(null, mapDispatchToProps)(MessageThreadlistRow);
