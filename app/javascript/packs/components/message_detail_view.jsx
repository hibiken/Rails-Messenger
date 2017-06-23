import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MessageBubble from './message_bubble';
import MessageInput from './message_input';
import TypingIndicator from './typing_indicator';
// import SearchHeader from './search_header';

class MessageDetailView extends Component {
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

  render() {
    const { usernames, messages, currentUserId, messageable, messageThreadId, typingUsers } = this.props;
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
              isDelivered={message.persisted}
              messageBody={message.body}
              avatarUrl={message.avatarUrl}
              deliveryError={message.error === true}
            />
          ))}
          {typingUsers.length > 0 && (
            <div className="message-detail-view__typing-indicator-row">
              <div className="message-bubble__avatar">
                <img
                  src={typingUsers[0].avatarUrl}
                  className="message-bubble__avatar-image"
                />
              </div>
              <TypingIndicator />
            </div>
          )}
          {messageable && (
            <MessageInput
              messageThreadId={messageThreadId}
              createMessage={this.props.createMessage}
              typingMessage={this.props.typingMessage}
            />
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
  typingUsers: PropTypes.array.isRequired,
};

export default MessageDetailView;
