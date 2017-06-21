import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MessageBubble = (props) => {
  const bubbleClass = classNames({
    'message-bubble--right': props.isCurrentUser,
    'message-bubble--left': !props.isCurrentUser,
  });

  const deliveryStatusClass = classNames({
    'message-bubble__delivery-status--pending': !props.isDelivered,
    'message-bubble__delivery-status--sent': props.isDelivered,
  });

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
            <i className="fa fa-check-circle" aria-hidden="true"/>
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
  avatarUrl: PropTypes.string.isRequired,
};

export default MessageBubble;
