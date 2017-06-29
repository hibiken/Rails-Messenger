import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignoutLink from './signout_link';
import MessageThreadlistRowContainer from '../containers/message_threadlist_row_container';

class MainSidebar extends Component {
  render() {
    const { messageThreads, activeThreadId } = this.props;

    return (
      <div className="main-sidebar__root">
        <header className="main-sidebar__header">
          <button>
            <SignoutLink />
          </button>
          <div>
            <strong className="main-sidebar__header-title">Messenger</strong>
          </div>
          <button>
            New Message
          </button>
        </header>
        <div className="message-threadlist__root">
          <ul className="message-threadlist__rows-container">
            {messageThreads.map(messageThread => (
              <MessageThreadlistRowContainer
                key={messageThread.id}
                isActive={messageThread.id === activeThreadId}
                messageThreadId={messageThread.id}
                usernames={messageThread.receivers.map(r => r.username)}
                avatarUrl={messageThread.receivers[0].avatarUrl}
                lastMessage={messageThread.lastMessage}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

MainSidebar.propTypes = {
  messageThreads: PropTypes.array.isRequired,
  activeThreadId: PropTypes.number
};

export default MainSidebar;
