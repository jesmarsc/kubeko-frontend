import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './Dashboard.module.css';

import DashboardNav from './Navbar/DashboardNav';
import SidePanel from './SidePanel/SidePanel';
import Content from './Content/Content';
import { withAuthorization } from '../Session';
import ClusterForm from './Forms/ClusterForm';
import DeploymentForm from './Forms/DeploymentForm';

class Dashboard extends Component {
  state = {
    clusters: [
      '123.123.123.123',
      '245.245.245.245',
      '111.111.111.111',
      '456.456.456.456',
      '123.456.789.123'
    ],
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
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
              path={this.props.match.url + '/deployments/new'}
              component={DeploymentForm}
            />
            <Route
              path={this.props.match.url + '/clusters/new'}
              component={ClusterForm}
            />
            <Route
              path={this.props.match.url + '/clusters'}
              render={() => <Content clusters={this.state.clusters} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Dashboard);
