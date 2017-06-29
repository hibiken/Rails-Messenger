import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

const MessageThreadlistRow = (props) => {
  const rowClass = classNames({
    'message-threadlist-row__root': true,
    'message-threadlist-row__root--active': props.isActive,
  });

  const wasSentToday = moment(props.lastMessage.createdAt).isSame(new Date(), 'day');

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
      <div className="message-threadlist-row__main-content">
        <div>
          <div>
            <span className="message-threadlist-row__username">{props.usernames.join(', ')}</span>
          </div>
          <div>
            <span className="message-threadlist-row__message">
              {props.currentUserId === props.lastMessage.userId && (<span>You:&nbsp;</span>)}
              {_.truncate(props.lastMessage.body, { length: 40, 'separator': /,? +/})}
            </span>
          </div>
        </div>
        <div className="message-threadlist-row__sent-at">
          {
            wasSentToday ?
              moment(props.lastMessage.createdAt).format('h:mm A') :
              moment(props.lastMessage.createdAt).format('MMM D')
          }
        </div>
      </div>
    </li>
  );

}

MessageThreadlistRow.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  usernames: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastMessage: PropTypes.object.isRequired,
};

export default MessageThreadlistRow;
