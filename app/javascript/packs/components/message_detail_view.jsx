import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SearchHeader from './search_header';

class MessageDetailView extends Component {
  render() {
    return (
      <div className="message-detail-view__root">
        <header className="message-detail-view__header">
          <div className="message-detail-view__header-title-box">
            <h2 className="message-detail-view__header-usernames">
              {this.props.usernames.join(', ')}
            </h2>
          </div>
        </header>
        <h1>Hi</h1>
        <div>
          {this.props.messages.map(message => (
            <div>
              {message.body}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MessageDetailView.propTypes = {
  usernames: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
};

export default MessageDetailView;
