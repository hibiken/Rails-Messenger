import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
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

  const seenStatusClass = classNames({
    'message-bubble__seen-status': true,
    'message-bubble__seen-status--multiple-users': props.lastSeenUserIds.length > 1,
  });

  // TODO: when deliveryError is true, open "re-send" modal on click
  // NOTE: There is a bug with RectTootip with scrolling.
  // TODO: Write your own component for tooltip :)
  return (
    <div className="message-bubble__root group">
      <div
        className={bubbleClass}
        data-for={props.messageId}
        data-tip={moment(props.sentAt).format('MMMM Do YYYY, h:mm a')}>
        {props.messageBody}
      </div>
      <ReactTooltip
        id={props.messageId}
        place="left"
        type="dark"
        effect="solid"
        delayHide={0}
        delayShow={0}
        scrollHide
      />

      {props.isCurrentUser && props.seenUserCount === 0 && (
        <div className="message-bubble__delivery-status">
          <span className={deliveryStatusClass}>
            <i className={statusIconClass} aria-hidden="true"/>
          </span>
        </div>
      )}

      {props.lastSeenUserIds.length > 0 && (
        <div className={seenStatusClass}>
          {props.lastSeenUserIds.map(userId => (
            <ProfilePicture
              key={userId}
              userId={userId}
              size={15}
              className="message-bubble__seen-status-avatar-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

MessageBubble.propTypes = {
  messageId: PropTypes.number.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  isDelivered: PropTypes.bool.isRequired,
  isFirstInGroup: PropTypes.bool.isRequired,
  isLastInGroup: PropTypes.bool.isRequired,
  messageBody: PropTypes.string.isRequired,
  deliveryError: PropTypes.bool.isRequired,
  seenUserCount: PropTypes.number.isRenuired,
  lastSeenUserIds: PropTypes.array.isRequired,
  sentAt: PropTypes.string.isRequired,
};

export default MessageBubble;
