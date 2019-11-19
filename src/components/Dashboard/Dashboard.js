import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardNav from './Navbar/DashboardNav';
import SidePanel from './SidePanel/SidePanel';
import ProviderDashboard from './Content/ProviderDashboard';
import UserDashboard from './Content/UserDashboard';
import { withAuthorization } from '@session';
import styles from './Dashboard.module.scss';

class Dashboard extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.Sidepanel}>
          <SidePanel />
        </div>
        <div className={styles.NavBar}>
          <DashboardNav />
        </div>
        <div className={styles.Content}>
          <Switch>
            <Route
              path={this.props.match.url + '/deployments'}
              component={UserDashboard}
            />
            <Route
              path={this.props.match.url + '/clusters'}
              component={ProviderDashboard}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
