import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MessageInput from './message_input';
import TypingIndicator from './typing_indicator';
import Loader from './loader';
import MessageGroup from './message_group';
// import SearchHeader from './search_header';

class MessageDetailView extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const { messageCount, typingUsers } = this.props;
    const messagesFirstRender = prevProps.messageCount == 0 && messageCount > 0;
    const newMessageAdded = prevProps.messageCount + 1 === messageCount;
    const typingUsersAdded = prevProps.typingUsers.length < typingUsers.length;
    if (messagesFirstRender || newMessageAdded || typingUsersAdded) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  shouldFetchMessages = () => {
    const { allMessagesFetched, isFetchingMessages } = this.props;
    return !isFetchingMessages && !allMessagesFetched;
  }


  handleScroll = (event) => {
    const { scrollTop } = this.refs.messagesContainer;
    const offset = 50;
    if (scrollTop < offset && this.shouldFetchMessages()) {
      this.props.fetchMessagesFor(this.props.messageThreadId);
    }
  }

  render() {
    const { usernames, messageCount, messageGroups, currentUserId, messageable,
      messageThreadId, typingUsers, isFetchingMessages } = this.props;

    // header height 54px, footer height 50px
    const mainContentHeight = window.innerHeight - (54 + 50);

    const loaderContainerClass = classnames({
      'message-detail-view__message-thread-loading': true,
      'message-detail-view__message-thread-loading--initial': messageCount === 0,
    });

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
          onScroll={this.handleScroll}
          ref="messagesContainer"
          className="message-detail-view__main-content"
          style={{ height: mainContentHeight}}>
          {isFetchingMessages && (
            <div className={loaderContainerClass}>
              <Loader />
            </div>
          )}
          <div className="message-detail-view__messages-container">
            {messageGroups.map((msgGroup, idx) => (
              <MessageGroup
                key={idx}
                isCurrentUser={msgGroup.userId === currentUserId}
                avatarUrl={msgGroup.avatarUrl}
                messages={msgGroup.messages}
              />
            ))}
            {typingUsers.length > 0 && (
              <div className="message-detail-view__typing-indicator-row">
                <div className="message-group__avatar">
                  <img
                    src={typingUsers[0].avatarUrl}
                    className="message-group__avatar-image"
                  />
                </div>
                <TypingIndicator />
              </div>
            )}
          </div>
          {messageable && (
            <div className="message-detail-view__input-footer">
              <MessageInput
                messageThreadId={messageThreadId}
                createMessage={this.props.createMessage}
                typingMessage={this.props.typingMessage}
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
  messageCount: PropTypes.number.isRequired,
  messageGroups: PropTypes.array.isRequired,
  messageable: PropTypes.bool.isRequired,
  messageThreadId: PropTypes.string,
  createMessage: PropTypes.func.isRequired,
  fetchMessagesFor: PropTypes.func.isRequired,
  typingUsers: PropTypes.array.isRequired,
  allMessagesFetched: PropTypes.bool.isRequired,
  isFetchingMessages: PropTypes.bool.isRequired,
};

export default MessageDetailView;
