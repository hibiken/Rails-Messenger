import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { cancelNewMessageThread } from '../actions/new_message_thread';
import NewMessageThreadlistRow from '../components/new_message_threadlist_row';

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(push('/new'));
  },
  onCancel(event) {
    event.stopPropagation();
    dispatch(cancelNewMessageThread());
  },
});

export default connect(null, mapDispatchToProps)(NewMessageThreadlistRow);


