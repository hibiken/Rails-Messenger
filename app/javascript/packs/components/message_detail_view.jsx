import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import moment from 'moment';
import MessageInput from './message_input';
import TypingIndicator from './typing_indicator';
import Loader from './loader';
import MessageGroup from './message_group';
import { markAsSeen } from '../api/message_threads';
import ReactTooltip from 'react-tooltip';
import SearchHeaderContainer from '../containers/search_header_container';

class MessageDetailView extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const { messageCount, typingUsers, messageThreadId } = this.props;
    const messagesFirstRender = prevProps.messageCount === 0 && messageCount > 0;
    const newMessageAdded = prevProps.messageCount + 1 === messageCount;
    const typingUsersAdded = prevProps.typingUsers.length < typingUsers.length;
    const activeThreadChanged = prevProps.messageThreadId !== messageThreadId;
    if (messagesFirstRender || newMessageAdded || typingUsersAdded || activeThreadChanged) {
      this.scrollToBottom();
    }

    if (newMessageAdded) {
      markAsSeen(this.props.messageThreadId);
    }
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  shouldFetchMessages = () => {
    const { allMessagesFetched, isFetchingMessages, messageThreadId } = this.props;
    return messageThreadId && !isFetchingMessages && !allMessagesFetched;
  }


  handleScroll = (event) => {
    const { scrollTop } = this.refs.messagesContainer;
    const offset = 30;
    if (scrollTop < offset && this.shouldFetchMessages()) {
      this.props.fetchMessagesFor(this.props.messageThreadId);
    }
  }

  messageGroupsWithTimestamp = (messageGroups) => {
    return messageGroups.reduce((acc, msgGroup) => {
      if (acc.length === 0) {
        acc.push({ type: 'dateBreak', timestamp: msgGroup.createdAt }); 
        acc.push({ ...msgGroup, type: 'messageGroup' });
        return acc;
      }

      const lastMessageGroup = _.last(acc);

      if (moment(msgGroup.createdAt).isBefore(moment(lastMessageGroup.createdAt).add('12', 'hours'))) {
        acc.push({ type: 'messageGroup', ...msgGroup });
        return acc;
      } else {
        acc.push({ type: 'dateBreak', timestamp: msgGroup.createdAt });
        acc.push({ ...msgGroup, type: 'messageGroup' });
        return acc;
      }
    }, []);
  }


  render() {
    const {
      usernames, messageCount, messageGroups, currentUserId, messageable,
      messageThreadId, typingUsers, isFetchingMessages, lastSeenMessageIdsByUserId,
      isAddingNewMessageThread,
    } = this.props;

    const DateBreak = (props) => (
      <div className="message-detail-view__date-break">
        <h4 className="message-detail-view__date-break-text">
          {moment(props.timestamp).format('MMM Do, H:mmA')}
        </h4>
      </div>
    );

    const loaderContainerClass = classnames({
      'message-detail-view__message-thread-loading': true,
      'message-detail-view__message-thread-loading--initial': messageCount === 0,
    });

    return (
      <div className="message-detail-view__root">
        {isAddingNewMessageThread ? (
          <SearchHeaderContainer />
        ) : (
          <header className="message-detail-view__header">
            <div className="message-detail-view__header-title-box">
              <h2 className="message-detail-view__header-usernames">
                {usernames.join(', ')}
              </h2>
            </div>
          </header>
        )}
        <div
          className="message-detail-view__main-content">
          <div
            onScroll={this.handleScroll}
            ref="messagesContainer"
            className="message-detail-view__messages-window">
            {isFetchingMessages && (
              <div className={loaderContainerClass}>
                <Loader />
              </div>
            )}
            <div className="message-detail-view__messages-container">
              <div
                style={{ float:"left", clear: "both" }}
                ref={(elem) => this.messagesEnd = elem}
              />
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
              {this.messageGroupsWithTimestamp(messageGroups).reverse().map((item, idx) => {
                if (item.type === 'dateBreak') {
                  return <DateBreak key={idx} timestamp={item.timestamp} />;
                }
                return (
                  <MessageGroup
                    key={idx}
                    isCurrentUser={item.userId === currentUserId}
                    currentUserId={currentUserId}
                    avatarUrl={item.avatarUrl}
                    username={item.username}
                    messages={item.messages}
                    threadUserCount={usernames.length + 1}
                    lastSeenMessageIdsByUserId={lastSeenMessageIdsByUserId}
                  />
                );
              }
              )}
            </div>
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
  lastSeenMessageIdsByUserId: PropTypes.array.isRequired,
  isAddingNewMessageThread: PropTypes.bool.isRequired,
};

export default MessageDetailView;
