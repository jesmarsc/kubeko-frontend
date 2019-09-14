import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import styles from './SidePanel.module.css';

const SidePanel = () => {
  return (
    <nav className={styles.SidePanel}>
      <div className={styles.LogoContainer}>
        <span className={styles.logo}>Hello, Jesmar</span>
      </div>

      <ul className={styles.SideMenu}>
        <li className={styles.SideMenu}>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca44' }}
            className={styles.Link}
            to="/dashboard"
          >
            <span className={styles.SideMenu}>
              <Icon type="branches" />
              <span style={{ marginLeft: '16px' }}>Workloads</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{ backgroundColor: '#cacaca' }}
            className={styles.Link}
            to="/"
            exact
          >
            <span className={styles.SideMenu}>
              <Icon type="cluster" />
              <span style={{ marginLeft: '16px' }}>Clusters</span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SidePanel;
