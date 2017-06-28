import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserById } from '../reducers';

class ProfilePicutre extends Component {
  render() {
    return (
      <img
        className={this.props.className}
        src={this.props.avatarUrl}
        width={this.props.size}
      />
    );
  }
}

ProfilePicutre.propTypes = {
  userId: PropTypes.number.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

const mapStateToProps = (state, { userId }) => {
  const user = getUserById(state, userId);
  return { avatarUrl: user.avatarUrl };
}

export default connect(mapStateToProps, null)(ProfilePicutre);
