import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainSidebar from '../components/main_sidebar';
import { fetchUsers } from '../actions/users';
import * as Selectors from '../reducers';

class Dashboard extends Component {
  componentDidMount() {
    console.log('fetching users...');
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="dashboard__root">
        <MainSidebar users={this.props.users} />
        <div className="message-detail-view__root">
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  users: Selectors.getAllUsers(state),
});

export default connect(mapStateToProps, { fetchUsers })(Dashboard);