import React from 'react';
import PropTypes from 'prop-types';

const SignoutLink = (props) => (
  <a
    rel="nofollow"
    data-method="delete"
    href="/users/sign_out">
    Sign Out
  </a>
);

export default SignoutLink;

