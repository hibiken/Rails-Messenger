import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MessageBubble = (props) => {
  const bubbleClass = classNames({
    'message-bubble--right': props.isCurrentUser,
    'message-bubble--left': !props.isCurrentUser,
  });

  return (
    <div className="message-bubble__root group">
      <div className={bubbleClass}>
        {props.messageBody}
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  messageBody: PropTypes.string.isRequired,
};

export default MessageBubble;
