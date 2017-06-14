import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MessageThreadlistRow = (props) => (
  <li className="message-threadlist-row__root">
    <div className="message-threadlist-row__avatar-container">
      <img src={props.avatarUrl} className="message-threadlist-row__avatar-image" width="50" />
    </div>
    <div>
      <div>
        <span className="message-threadlist-row__username">{props.username}</span>
      </div>
      <div>
        <span className="message-threadlist-row__message">You are now connected on Messenger</span>
      </div> 
    </div>
  </li>
);

MessageThreadlistRow.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default MessageThreadlistRow;
