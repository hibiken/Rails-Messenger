import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageDetailView extends Component {
  render() {
    return (
      <div className="message-detail-view__root">
        <header className="message-detail-view__header">
          <label>To:</label>
          <input type="text" />
        </header>
        <h1>Hi</h1>
      </div>
    );
  }
}

export default MessageDetailView;
