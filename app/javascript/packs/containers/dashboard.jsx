import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSidebar from '../components/main_sidebar';
import { fetchUsers } from '../actions/users';

class Dashboard extends Component {
  componentDidMount() {
    console.log('fetching users...');
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="dashboard__root">
        Messenger Dashboard!
        <MainSidebar />
      </div>
    );
  }
}

export default connect(null, { fetchUsers })(Dashboard);
