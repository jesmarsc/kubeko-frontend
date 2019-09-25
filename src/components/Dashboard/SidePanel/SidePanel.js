import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import styles from './SidePanel.module.css';
import { AuthUserContext } from '../../Session';

const SidePanel = props => {
  return (
    <nav className={styles.SidePanel}>
      <AuthUserContext.Consumer>
        {authUser => (
          <div className={styles.LogoContainer}>
            <span className={styles.logo}>Hello, {authUser.email}</span>
          </div>
        )}
      </AuthUserContext.Consumer>
      <ul className={styles.SideMenu}>
        <li className={styles.SideMenu}>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to="/"
            exact
          >
            <span className={styles.SideMenu}>
              <Icon type="branches" />
              <span style={{ marginLeft: '16px' }}>Workloads</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to={props.match.url + '/clusters'}
            exact
          >
            <span className={styles.SideMenu}>
              <Icon type="cluster" />
              <span style={{ marginLeft: '16px' }}>Clusters</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to={props.match.url + '/clusters/new'}
            exact
          >
            <span className={styles.SideMenu}>
              <Icon type="form" />
              <span style={{ marginLeft: '16px' }}>Add Cluster</span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(SidePanel);
