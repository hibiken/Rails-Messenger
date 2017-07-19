import React from 'react';
import PropTypes from 'prop-types';
import UserPicture from './user_picture';

const ThreadUsersPicture  = (props) => {
  const { avatarUrls } = props;
  if (avatarUrls.length < 2) {
    throw new Error('ThreadUsersPicutre: prop avatarUrls.length has to be at least 2')
  }

  if (avatarUrls.length === 2) {
    return (
      <div className="thread-users-picture__root">
        <div className="thread-users-picture__image-container--half-left">
          <UserPicture
            avatarUrl={avatarUrls[0]}
            className="thread-users-picture-image--half"
            type="square"
            width={50}
          />
        </div>
        <div className="thread-users-picture__image-container--half-right">
          <UserPicture
            avatarUrl={avatarUrls[1]}
            className="thread-users-picture-image--half"
            type="square"
            width={50}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="thread-users-picture__root">
      <div className="thread-user-picture__image-container--primary">
        <UserPicture
          avatarUrl={avatarUrls[0]}
          className="thread-user-picture__image--primary"
          type="square"
          width={50}
        />
      </div>
      <div className="thread-users-picture__image-contaiiner--secondary-top">
        <UserPicture
          avatarUrl={avatarUrls[1]}
          className="thread-users-picture__image--secondary-top"
          type="square"
          width={20}
        />
      </div>
      <div className="thread-users-picture__image-container--secondary-bottom">
        <UserPicture
          avatarUrl={avatarUrls[2]}
          className="thread-users-picture__image--secondary-bottom"
          type="square"
          width={20}
        />
      </div>
    </div>
  );
};

ThreadUsersPicture.propTypes = {
  avatarUrls: PropTypes.array.isRequired,
};


export default ThreadUsersPicture;
