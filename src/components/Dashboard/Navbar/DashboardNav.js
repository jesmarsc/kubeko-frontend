import React from 'react';
import styles from './DashboardNav.module.scss';
import { Avatar } from 'antd';

const DashboardNav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <Avatar shape="square" icon="user" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardNav;
