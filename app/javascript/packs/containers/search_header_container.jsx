import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchHeader from '../components/search_header';
import { getNewMessageThreadUsernames } from '../selectors';

const mapStateToProps = (state) => ({
  usernames: getNewMessageThreadUsernames(state),
});

export default connect(mapStateToProps)(SearchHeader);

