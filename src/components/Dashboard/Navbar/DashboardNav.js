import React from 'react';
import styles from './DashboardNav.module.scss';
import SignOutButton from '@components/SignOut';

const DashboardNav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardNav;
