import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchHeader from './search_header';

class MessageDetailView extends Component {
  render() {
    return (
      <div className="message-detail-view__root">
        <SearchHeader />
        <h1>Hi</h1>
      </div>
    );
  }
}

export default MessageDetailView;
