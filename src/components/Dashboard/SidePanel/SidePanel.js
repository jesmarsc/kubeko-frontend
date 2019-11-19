import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import * as ROUTES from '@constants/routes';
import styles from './SidePanel.module.scss';

const SidePanel = props => {
  return (
    <nav className={styles.SidePanel}>
      <div className={styles.LogoContainer}>
        <NavLink to={'/'}>
          <h1 className={styles.Logo}>Kubeko</h1>
        </NavLink>
      </div>

      <ul className={styles.SideMenu}>
        <li>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to={ROUTES.WORKLOADS}
            exact
          >
            <span className={styles.Text}>
              <Icon type="branches" />
              <span style={{ marginLeft: '16px' }}>Workloads</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to={ROUTES.CLUSTERS}
            exact
          >
            <span className={styles.Text}>
              <Icon type="cluster" />
              <span style={{ marginLeft: '16px' }}>Clusters</span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(SidePanel);
