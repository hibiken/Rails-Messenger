import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SearchHeader from './search_header';

class MessageDetailView extends Component {
  constructor() {
    super();
    this.state = { messageBody: '' };
    this.handleMessageChange = (e) => {
      this.setState({ messageBody: e.target.value });
    }
  }

  handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.setState({ messageBody: '' });
      this.props.createMessage(
        this.props.messageThreadId,
        { body: this.state.messageBody }
      );
    }
  };


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
            <div key={message.id}>
              {message.body}
            </div>
          ))}
        </div>
        {this.props.messageable && (
          <div className="message-input__root">
            <input
              type="text"
              value={this.state.messageBody}
              placeholder="Type a message"
              onChange={this.handleMessageChange}
              onKeyDown={this.handleInputKeyDown}
            />
          </div>
        )}
      </div>
    );
  }
}

MessageDetailView.propTypes = {
  usernames: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  messageable: PropTypes.bool.isRequired,
  messageThreadId: PropTypes.string,
  createMessage: PropTypes.func.isRequired,
};

export default MessageDetailView;
