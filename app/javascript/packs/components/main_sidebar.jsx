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
            {messageThreads.map(mt => {
              const lastMessageSeenUserIds = mt.lastSeenMessageIdsByUserId.filter(item => {
                console.log('mt.lastMessage.id', mt.lastMessage.id);
                return item.lastSeenMessageId == mt.lastMessage.id;
              }).map(item => item.userId);
              return (
                <MessageThreadlistRowContainer
                  key={mt.id}
                  isActive={mt.id === activeThreadId}
                  messageThreadId={mt.id}
                  usernames={mt.receivers.map(r => r.username)}
                  avatarUrl={mt.receivers[0].avatarUrl}
                  lastMessage={mt.lastMessage}
                  lastMessageSeenUserIds={lastMessageSeenUserIds}
                />
              );
            })}
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
