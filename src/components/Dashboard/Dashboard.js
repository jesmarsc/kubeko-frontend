import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardNav from './Navbar/DashboardNav';
import SidePanel from './SidePanel/SidePanel';
import Content from './Content/Content';
import ClusterForm from './Forms/ClusterForm';
import Workloads from './Content/Workloads';
import { withAuthorization } from '@session';
import styles from './Dashboard.module.scss';

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
              path={this.props.match.url + '/deployments'}
              component={Workloads}
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
