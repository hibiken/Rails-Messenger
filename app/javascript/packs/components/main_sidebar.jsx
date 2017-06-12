import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignoutLink from './signout_link';

class MainSidebar extends Component {
  render() {
    return (
      <div className="main-sidebar__root">
        <header>
          Messenger
          <button onClick={this.handleSignOutClick}>
            <SignoutLink />
          </button>
        </header>
      </div>
    );
  }
}

export default MainSidebar;
