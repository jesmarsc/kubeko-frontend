import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import SignOutButton from '../../SignOut';
import * as ROUTES from '../../../constants/routes';

import styles from './LandingNav.module.css';

class LandingNav extends Component {
  render() {
    return (
      <nav className={styles.navMain}>
        <div className={styles.container}>
          <ul className={styles.navMainRight}>
            <li>
              <Link to={ROUTES.LANDING}>
                <Button size="large" type="primary" ghost>
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.DASH}>
                <Button size="large" type="primary">
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.SIGN_IN}>
                <Button size="large" type="primary">
                  Sign In
                </Button>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.SIGN_UP}>
                <Button size="large" type="primary">
                  Sign Up
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
  }
}

export default LandingNav;
