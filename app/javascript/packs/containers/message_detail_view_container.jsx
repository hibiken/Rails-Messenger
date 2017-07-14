import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageDetailView from '../components/message_detail_view';
import {
  getActiveMessageThread,
  getCurrentUserId,
  getNewMessageThreadActive,
  getActiveNewMessageThread,
  getIsFetchingNewMessageThread,
} from '../selectors';
import { createMessage } from '../actions/messages';
import { fetchMessagesFor } from '../actions/message_threads';

const mapStateToProps = (state) => {
  const currentUserId = getCurrentUserId(state);
  const isAddingNewMessageThread = getNewMessageThreadActive(state);
  const isFetchingNewThread = getIsFetchingNewMessageThread(state);

  const activeThread = isAddingNewMessageThread ?
    getActiveNewMessageThread(state) : getActiveMessageThread(state);

  const isFetchingMessages = isAddingNewMessageThread ?
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
      isAddingNewMessageThread,
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
    isAddingNewMessageThread,
  };
};

export default connect(mapStateToProps, {
  fetchMessagesFor,
  createMessage,
})(MessageDetailView);




