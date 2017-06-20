import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageInput extends Component {
  constructor() {
    super();
    this.state = { messageBody: '' }
  }

  handleChange = (event) => {
    this.setState({ messageBody: event.target.value });
  }

  handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.setState({ messageBody: '' });
      this.props.createMessage(
        this.props.messageThreadId,
        { body: this.state.messageBody }
      );
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
