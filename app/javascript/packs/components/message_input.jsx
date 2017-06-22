import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { typingMessageStopped, typingMessageStarted } from '../api/user_typing';

class MessageInput extends Component {
  constructor() {
    super();
    this.state = { messageBody: '' }

    this.onTypingStart = _.debounce(() => {
      typingMessageStarted(this.props.messageThreadId);
    }, 1300, { leading: true, trailing: false });

    this.onTypingStop = _.debounce(() => {
      typingMessageStopped(this.props.messageThreadId);
    }, 1300, { leading: false, trailing: true });
  }

  handleChange = (event) => {
    this.setState({ messageBody: event.target.value });
  }

  handleInputKeyDown = (event) => {
    const { typingMessage, messageThreadId } = this.props;
    if (event.key === 'Enter' && event.target.value.trim().length) {
      this.setState({ messageBody: '' });
      this.props.createMessage(
        this.props.messageThreadId,
        { body: this.state.messageBody }
      );
    } else {
      this.onTypingStart();
      this.onTypingStop();
    }
  }

  render() {
    return (
      <div className="message-input__root">
        <input
          type="text"
          value={this.state.messageBody}
          placeholder="Type a message"
          onChange={this.handleChange}
          onKeyDown={this.handleInputKeyDown}
          className="message-input__input-field"
        />
      </div>
    );
  }
}

MessageInput.propTypes = {
  messageThreadId: PropTypes.string.isRequired,
  createMessage: PropTypes.func.isRequired,
};

export default MessageInput;
