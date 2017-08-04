import React from 'react';
import PropTypes from 'prop-types';

const UserPicture  = (props) => {
  const { avatarUrl, type, width } = props;
  // Multiply width by 4 to get high resolution picture.
  const imageUrl = `${avatarUrl}?type=${type}&width=${(width * 4).toString()}`;

  return (
    <img
      src={imageUrl}
      className={props.className}
      width={width.toString()}
    />
  );
};

// NOTE: for type please see:
// https://developers.facebook.com/docs/graph-api/reference/user/picture/
UserPicture.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
};

UserPicture.defaultType = {
  type: 'normal',
};

export default UserPicture;
