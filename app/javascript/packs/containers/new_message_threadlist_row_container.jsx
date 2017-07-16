import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NewMessageThreadlistRow from '../components/new_message_threadlist_row';

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(push('/new'));
  },
});

export default connect(null, mapDispatchToProps)(NewMessageThreadlistRow);


