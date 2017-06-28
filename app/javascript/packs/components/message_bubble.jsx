import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ProfilePicture from '../containers/profile_picture_container';

const MessageBubble = (props) => {
  const bubbleClass = classNames({
    'message-bubble--right': props.isCurrentUser,
    'message-bubble--left': !props.isCurrentUser,
    'message-bubble--first-in-group': props.isFirstInGroup,
    'message-bubble--last-in-group': props.isLastInGroup,
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
      <div className={bubbleClass}>
        {props.messageBody}
      </div>

      {props.isCurrentUser && props.seenUserCount === 0 && (
        <div className="message-bubble__delivery-status">
          <span className={deliveryStatusClass}>
            <i className={statusIconClass} aria-hidden="true"/>
          </span>
        </div>
      )}

      {props.lastSeenUserIds.length > 0 && (
        <div className="message-bubble__seen-status">
          {props.lastSeenUserIds.map(userId => (
            <ProfilePicture
              key={userId}
              userId={userId}
              size={20}
              className="message-bubble__seen-status-avatar-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  isDelivered: PropTypes.bool.isRequired,
  isFirstInGroup: PropTypes.bool.isRequired,
  isLastInGroup: PropTypes.bool.isRequired,
  messageBody: PropTypes.string.isRequired,
  deliveryError: PropTypes.bool.isRequired,
  seenUserCount: PropTypes.number.isRequired,
  lastSeenUserIds: PropTypes.array.isRequired,
};

export default MessageBubble;
