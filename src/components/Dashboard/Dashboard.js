import React, { Component } from 'react';
import styles from './Dashboard.module.css';

import DashboardNav from '../Navbar/DashboardNav';
import SidePanel from './SidePanel/SidePanel';
import Content from './Content/Content';

class Dashboard extends Component {
  state = {
    clusters: [
      '123.123.123.123',
      '245.245.245.245',
      '111.111.111.111',
      '456.456.456.456',
      '123.123.123.123',
      '123.123.123.123',
      '123.123.123.123',
      '123.123.123.123',
    ],
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div className={styles.Dashboard}>
        <SidePanel />
        <div className={styles.column}>
          <DashboardNav />
          <Content clusters={this.state.clusters} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
