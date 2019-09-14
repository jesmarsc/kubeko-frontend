import React from 'react';
import styles from './DashboardNav.module.css';
import { Button, Avatar, Icon } from 'antd';

const DashboardNav = () => {
  return (
    <nav className={styles.nav}>
      <Button type="link">
        <Icon type="left" />
      </Button>
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
