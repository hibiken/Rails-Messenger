import React from 'react';
import PropTypes from 'prop-types';

const SignoutLink = (props) => (
  <a
    rel="nofollow"
    data-method="delete"
    href="/users/sign_out">
    <i className="fa fa-sign-out signout-link__icon" aria-hidden="true" />
  </a>
);

export default SignoutLink;

