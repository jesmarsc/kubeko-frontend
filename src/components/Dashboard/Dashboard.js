import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Dashboard.module.css';

class Dashboard extends Component {
  state = {
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
        <nav className={styles.SidePanel}>
          <div className={styles.Logo} />
          <ul className={styles.SideMenu}>
            <li className={styles.SideMenu}>
              <NavLink
                activeStyle={{ backgroundColor: '#cacaca' }}
                className={styles.Link}
                to="/dashboard"
              >
                <span className={styles.SideMenu}>Workloads</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ backgroundColor: '#cacaca' }}
                className={styles.Link}
                to="/"
                exact
              >
                <span className={styles.SideMenu}>Clusters</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Dashboard;
