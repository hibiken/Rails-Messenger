import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MessageBubble from './message_bubble';
// import SearchHeader from './search_header';

class MessageDetailView extends Component {
  constructor() {
    super();
    this.state = { messageBody: '' };
    this.handleMessageChange = (e) => {
      this.setState({ messageBody: e.target.value });
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
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
    const { usernames, messages, currentUserId, messageable } = this.props;
    const mainContentHeight = window.innerHeight - 54;

    return (
      <div className="message-detail-view__root">
        <header className="message-detail-view__header">
          <div className="message-detail-view__header-title-box">
            <h2 className="message-detail-view__header-usernames">
              {usernames.join(', ')}
            </h2>
          </div>
        </header>
        <div
          className="message-detail-view__main-content"
          style={{ height: mainContentHeight}}>
          {messages.map(message => (
            <MessageBubble 
              key={message.id}
              isCurrentUser={message.userId === currentUserId}
              messageBody={message.body}
            />
          ))}
          {messageable && (
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
          <div
            style={{ float:"left", clear: "both" }}
            ref={(elem) => this.messagesEnd = elem}
          />
        </div>
      </div>
    );
  }
}

MessageDetailView.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  usernames: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  messageable: PropTypes.bool.isRequired,
  messageThreadId: PropTypes.string,
  createMessage: PropTypes.func.isRequired,
};

export default MessageDetailView;
