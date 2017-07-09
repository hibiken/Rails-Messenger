import React from 'react';
import PropTypes from 'prop-types';

const NewMessageButton = (props) => {
  return (
    <button
      className="new-message-button__root"
      onClick={props.onClick}>
      New Message
    </button>
  );
};

NewMessageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewMessageButton;
