import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import { AuthUserContext } from '@session';
import SignOutButton from '@components/SignOut';
import * as ROUTES from '@constants/routes';

import styles from './LandingNav.module.css';

const LandingNavbar = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <LandingNavAuth /> : <LandingNavNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const LandingNavAuth = () => {
  return (
    <nav className={styles.navMain}>
      <div className={styles.container}>
        <ul className={styles.navMainRight}>
          <li>
            <Link to={ROUTES.DASH}>
              <Button size="large" type="primary">
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

const LandingNavNonAuth = () => {
  return (
    <nav className={styles.navMain}>
      <div className={styles.container}>
        <ul className={styles.navMainRight}>
          <li>
            <Link to={ROUTES.SIGN_IN}>
              <Button icon="login" size="large" type="primary">
                Log in
              </Button>
            </Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_UP}>
              <Button icon="form" size="large" type="ghost">
                Sign Up
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;
