import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignoutLink from './signout_link';
import MessageThreadlistRow from './message_threadlist_row';

class MainSidebar extends Component {
  render() {
    const { users } = this.props;

    return (
      <div className="main-sidebar__root">
        <header className="main-sidebar__header">
          <button onClick={this.handleSignOutClick}>
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
            {users.map(user => (
              <MessageThreadlistRow
                key={user.id}
                username={user.username}
                avatarUrl={user.avatarUrl}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

MainSidebar.propTypes = {
  users: PropTypes.array.isRequired,
};

export default MainSidebar;
