import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import styles from './LandingNav.module.css';

class LandingNav extends Component {
  render() {
    return (
      <nav className={styles.navMain}>
        <div className={styles.container}>
          <ul className={styles.navMainRight}>
            <li>
              <Link to="/">
                <Button size="large" type="primary" ghost>
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <Button size="large" type="primary">
                  Dashboard
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default LandingNav;
