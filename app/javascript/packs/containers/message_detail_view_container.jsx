import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageDetailView from '../components/message_detail_view';
import {
  getCurrentUserId,
  getUsersByIds,
  getActiveMessageThread,
} from '../reducers';
import { createMessage } from '../actions/messages';
import { fetchMessagesFor } from '../actions/message_threads';

const mapStateToProps = (state) => {
  const activeThread = getActiveMessageThread(state);
  const currentUserId = getCurrentUserId(state);

  if (activeThread === false) {
    return {
      currentUserId,
      usernames: [],
      messages: [],
      messageable: false,
      messageThreadId: null,
      typingUsers: [],
      allMessagesFetched: false,
      isFetchingMessages: false,
    };
  }

  return {
    currentUserId,
    usernames: activeThread.receivers.map(r => r.username),
    messages: activeThread.messages,
    messageable: true,
    messageThreadId: activeThread.id,
    typingUsers: getUsersByIds(state, activeThread.typingUserIds),
    allMessagesFetched: activeThread.allMessagesFetched,
    isFetchingMessages: activeThread.isFetching,
  };
};

export default connect(mapStateToProps, {
  fetchMessagesFor,
  createMessage,
})(MessageDetailView);




