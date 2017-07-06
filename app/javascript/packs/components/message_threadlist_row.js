import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import ProfilePicture from '../containers/profile_picture_container';

const MessageThreadlistRow = (props) => {
  const { lastMessage, lastMessageSeenUserIds, currentUserId } = props;
  const isLastMessageSentByCurrentUser = lastMessage && lastMessage.userId === currentUserId;
  const lastMessageSeenOtherUserIds = lastMessageSeenUserIds.filter(id => id !== currentUserId);

  const rowClass = classNames({
    'message-threadlist-row__root': true,
    'message-threadlist-row__root--active': props.isActive,
    "message-threadlist-row__root--unread": (
      _.isObject(lastMessage) &&
      !isLastMessageSentByCurrentUser &&
      lastMessageSeenUserIds.indexOf(currentUserId) === -1
    )
  });

  const wasSentToday = lastMessage && moment(props.lastMessage.createdAt).isSame(new Date(), 'day');

  return  (
    <li>
      <Link to={`/t/${props.messageThreadId}`} className="message-threadlist-row__link">
        <div className={rowClass} onClick={props.onClick}>
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
              {_.isObject(lastMessage) && (
                <span className="message-threadlist-row__message">
                  {currentUserId === lastMessage.userId && (<span>You:&nbsp;</span>)}
                  {_.truncate(props.lastMessage.body, { length: 40, 'separator': /,? +/})}
                </span>
              )}
              {!_.isObject(lastMessage) && (
                <span className="message-threadlist-row__message">
                  You are now connected on Messenger
                </span>
              )}
            </div>
          </div>
          <div>
          {_.isObject(lastMessage) && (
              <div className="message-threadlist-row__sent-at">
                {
                  wasSentToday ?
                    moment(props.lastMessage.createdAt).format('h:mm A') :
                    moment(props.lastMessage.createdAt).format('MMM D')
                }
                {isLastMessageSentByCurrentUser && lastMessageSeenOtherUserIds.length === 1 && (
                  <div className="message-threadlist-row__seen-status">
                    <ProfilePicture
                      userId={lastMessageSeenOtherUserIds[0]}
                      size={15}
                      className="message-threadlist-row__seen-status-avatar-image"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
    </li>
  );

}

MessageThreadlistRow.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  usernames: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastMessage: PropTypes.object,
  lastMessageSeenUserIds: PropTypes.array.isRequired,
  messageThreadId: PropTypes.string.isRequired,
};

export default MessageThreadlistRow;
