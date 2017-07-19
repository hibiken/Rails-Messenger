import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserPicture from './user_picture';
import ThreadUsersPicutre from './thread_users_picture';
import defaultAvatarImage from '../images/default-avatar.jpg';

const NewMessageThreadlistRow = (props) => {
  const messageText = props.users.length > 0 ?
    `New message to ${props.users.map(u => u.username).join(', ')}` :
    'New Message';

  // TODO: split the image when there's more than one users.
  const avatarUrl = props.users.length > 0 ?
    props.users[0].avatarUrl : defaultAvatarImage;

  const rowClass = classNames({
    'message-threadlist-row__root': true,
    'message-threadlist-row__root--active': props.isActive,
  });

  // NOTE: Reuse classNames from MessageThreadlistRow.
  return (
    <li onClick={props.onClick}>
      <div className={rowClass}>
        <div className="message-threadlist-row__avatar-container">
          {props.users.length < 2 ? (
            <UserPicture
              avatarUrl={avatarUrl}
              className="message-threadlist-row__avatar-image"
              type="square"
              width={50}
            />
          ) : (
            <ThreadUsersPicutre
              avatarUrls={props.users.map(u => u.avatarUrl)}
            />
          )}
        </div>
        <div className="message-threadlist-row__main-content">
          <div>
            <div>
              <span className="message-threadlist-row__username">
                {messageText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

NewMessageThreadlistRow.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

export default NewMessageThreadlistRow;
