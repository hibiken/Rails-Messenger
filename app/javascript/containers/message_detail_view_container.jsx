import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageDetailView from '../components/message_detail_view';
import {
  getActiveMessageThread,
  getCurrentUserId,
  getIsNewThreadActive,
  getActiveNewMessageThread,
  getIsFetchingNewMessageThread,
} from '../selectors';
import { createMessage } from '../actions/messages';
import { fetchMessagesFor } from '../actions/message_threads';

const mapStateToProps = (state) => {
  const currentUserId = getCurrentUserId(state);
  const isNewThreadActive = getIsNewThreadActive(state);
  const isFetchingNewThread = getIsFetchingNewMessageThread(state);

  const activeThread = isNewThreadActive ?
    getActiveNewMessageThread(state) : getActiveMessageThread(state);

  const isFetchingMessages = isNewThreadActive ?
    isFetchingNewThread : activeThread.isFetching;

  if (activeThread === false) {
    return {
      currentUserId,
      usernames: [],
      messageCount: 0,
      messageGroups: [],
      messageable: false,
      messageThreadId: null,
      typingUsers: [],
      allMessagesFetched: false,
      isFetchingMessages: false,
      lastSeenMessageIdsByUserId: [],
      isNewThreadActive,
    };
  }

  return {
    currentUserId,
    usernames: activeThread.receivers.map(r => r.username),
    messageCount: activeThread.messageCount,
    messageGroups: activeThread.messageGroups,
    messageable: true,
    messageThreadId: activeThread.id,
    typingUsers: activeThread.typingUsers,
    allMessagesFetched: activeThread.allMessagesFetched,
    isFetchingMessages,
    lastSeenMessageIdsByUserId: activeThread.lastSeenMessageIdsByUserId,
    isNewThreadActive,
  };
};

export default connect(mapStateToProps, {
  fetchMessagesFor,
  createMessage,
})(MessageDetailView);

