import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MessageThreadlistRow = (props) => {
  const rowClass = classNames({
    'message-threadlist-row__root': true,
    'message-threadlist-row__root--active': props.isActive,
  });

  return  (
    <li
      className={rowClass}
      onClick={props.onClick}>
      <div className="message-threadlist-row__avatar-container">
        <img
          src={props.avatarUrl}
          className="message-threadlist-row__avatar-image"
          width="50"
        />
      </div>
      <div>
        <div>
          <span className="message-threadlist-row__username">{props.usernames.join(', ')}</span>
        </div>
        <div>
          <span className="message-threadlist-row__message">You are now connected on Messenger</span>
        </div> 
      </div>
    </li>
  );

}

MessageThreadlistRow.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  usernames: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default MessageThreadlistRow;
