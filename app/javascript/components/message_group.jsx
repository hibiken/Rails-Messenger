import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessageBubble from './message_bubble';

class MessageGroup extends Component {
  render() {
    const {
      avatarUrl, username, messages, isCurrentUser, threadUserCount,
      lastSeenMessageIdsByUserId, currentUserId,
    } = this.props;

    return (
      <div className="message-group__root">
        {!isCurrentUser && threadUserCount > 2 && (
          <div className="message-group__username">
            <strong className="message-group__username-text">{username.split(' ')[0]}</strong>
          </div>
        )}
        {!isCurrentUser && (
          <div className="message-group__avatar">
            <img src={avatarUrl} className="message-group__avatar-image" />
          </div>
        )}

        {messages.map((m, idx) => {
          const isFirstInGroup = idx === 0;
          const isLastInGroup  = idx == messages.length - 1;
          const seenUserCount = lastSeenMessageIdsByUserId.filter(item => {
            return item.userId !== currentUserId;
          }).filter(item => {
            return (new Date(m.createdAt) < new Date(item.lastSeenAt));
          }).length;
          const lastSeenUserIds = lastSeenMessageIdsByUserId.filter(item => {
            return parseInt(item.lastSeenMessageId) == parseInt(m.id);
          }).map(item => item.userId).filter(id => id !== currentUserId);

          return (
            <MessageBubble
              key={m.id}
              messageId={m.id}
              messageBody={m.body}
              isCurrentUser={isCurrentUser}
              isDelivered={m.persisted}
              deliveryError={m.error === true}
              isFirstInGroup={isFirstInGroup}
              isLastInGroup={isLastInGroup}
              seenUserCount={seenUserCount}
              lastSeenUserIds={lastSeenUserIds}
              sentAt={m.createdAt}
            />
          );
        })}
      </div>
    );
  }
}

MessageGroup.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  currentUserId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  threadUserCount: PropTypes.number.isRequired,
  lastSeenMessageIdsByUserId: PropTypes.array.isRequired,
};

export default MessageGroup;
