import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SidePanel.module.css';

const SidePanel = () => {
  return (
    <nav className={styles.SidePanel}>
      <div className={styles.LogoContainer}>
        <div className={styles.Logo} />
      </div>
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
  );
};

export default SidePanel;
