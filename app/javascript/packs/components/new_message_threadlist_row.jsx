import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatarImage from '../images/default-avatar.jpg';

const NewMessageThreadlistRow = (props) => {
  // NOTE: Reuse classNames from MessageThreadlistRow.
  return (
    <li>
      <div className="message-threadlist-row__root message-threadlist-row__root--active">
        <div className="message-threadlist-row__avatar-container">
          <img
            src={defaultAvatarImage}
            className="message-threadlist-row__avatar-image"
            width="50"
          />
        </div>
        <div className="message-threadlist-row__main-content">
          <div>
            <div>
              <span className="message-threadlist-row__username">
                New Message
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NewMessageThreadlistRow;
