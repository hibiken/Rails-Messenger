import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSidebar from '../components/main_sidebar';
import {
  getAllMessageThreads,
  getActiveMessageThreadId,
  getIsAddingNewThread,
  getIsNewThreadActive,
  getNewMessageThreadUsers,
} from '../selectors';

const mapStateToProps = (state) => ({
  isAddingNewThread: getIsAddingNewThread(state),
  isNewThreadActive: getIsNewThreadActive(state),
  newMessageThreadUsers: getNewMessageThreadUsers(state),
  messageThreads: getAllMessageThreads(state),
  activeThreadId: getActiveMessageThreadId(state),
});

export default connect(mapStateToProps)(MainSidebar);
