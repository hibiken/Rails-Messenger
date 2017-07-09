import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewMessageThread } from '../actions/message_threads';
import NewMessageButton from '../components/new_message_button';

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(addNewMessageThread());
  },
});

export default connect(null, mapDispatchToProps)(NewMessageButton);
