import React from 'react';
import PropTypes from 'prop-types';

const NewMessageButton = (props) => {
  return (
    <button
      className="new-message-button__root"
      onClick={props.onClick}>
      <i className="fa fa-pencil-square-o new-message-button__icon" aria-hidden="true" />
    </button>
  );
};

NewMessageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewMessageButton;
