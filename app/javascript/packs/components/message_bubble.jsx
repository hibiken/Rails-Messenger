import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MessageBubble = (props) => {
  const bubbleClass = classNames({
    'message-bubble--right': props.isCurrentUser,
    'message-bubble--left': !props.isCurrentUser,
  });

  const deliveryStatusClass = classNames({
    'message-bubble__delivery-status--sent': props.isDelivered,
    'message-bubble__delivery-status--pending': !props.isDelivered && !props.deliveryError,
    'message-bubble__delivery-status--error': props.deliveryError,
  });

  const statusIconClass = classNames({
    'fa': true,
    'fa-times-circle': props.deliveryError,
    'fa-check-circle': !props.deliveryError,
  });

  // TODO: when deliveryError is true, open "re-send" modal on click
  return (
    <div className="message-bubble__root group">
      {!props.isCurrentUser && (
        <div className="message-bubble__avatar">
          <img src={props.avatarUrl} className="message-bubble__avatar-image" />
        </div>
      )}

      <div className={bubbleClass}>
        {props.messageBody}
      </div>

      {props.isCurrentUser && (
        <div className="message-bubble__delivery-status">
          <span className={deliveryStatusClass}>
            <i className={statusIconClass} aria-hidden="true"/>
          </span>
        </div>
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  isDelivered: PropTypes.bool.isRequired,
  messageBody: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  deliveryError: PropTypes.bool.isRequired,
};

export default MessageBubble;
