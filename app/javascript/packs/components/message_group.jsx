import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MessageBubble from './message_bubble';

class MessageGroup extends Component {
  render() {
    const { avatarUrl, messages, isCurrentUser } = this.props;

    return (
      <div className="message-group__root">
        {!isCurrentUser && (
          <div className="message-group__avatar">
            <img src={avatarUrl} className="message-group__avatar-image" />
          </div>
        )}

        {messages.map((m, idx) => {
          const isFirstInGroup = idx === 0;
          const isLastInGroup  = idx == messages.length - 1;
          return (
            <MessageBubble
              key={m.id}
              messageBody={m.body}
              isCurrentUser={isCurrentUser}
              isDelivered={m.persisted}
              deliveryError={m.error === true}
              isFirstInGroup={isFirstInGroup}
              isLastInGroup={isLastInGroup}
            />
          );
        })}
      </div>
    );
  }
}

MessageGroup.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
};

export default MessageGroup;
