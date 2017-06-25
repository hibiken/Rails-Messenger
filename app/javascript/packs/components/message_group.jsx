import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageBubble from './message_bubble';

class MessageGroup extends Component {
  render() {
    const { messages } = this.props;

    return (
      <div>
        {messages.map(m => (
          <MessageBubble
            key={m.id}
            messageBody={m.body}
            isDelivered={m.persisted}
            deliveryError={m.error === true}
          />
        ))}
      </div>
    );
  }
}

MessageGroup.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  messageSentAt: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

export default MessageGroup;
