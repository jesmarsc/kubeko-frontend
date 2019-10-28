import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import styles from './SidePanel.module.scss';

const SidePanel = props => {
  return (
    <nav className={styles.SidePanel}>
      <div className={styles.LogoContainer}>
        <span className={styles.Logo}>
          <strong>Kubeko</strong>
        </span>
      </div>

      <ul className={styles.SideMenu}>
        <li>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to={props.match.url + '/deployments'}
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
            to={props.match.url + '/clusters'}
            exact
          >
            <span className={styles.Text}>
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
            <span className={styles.Text}>
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
