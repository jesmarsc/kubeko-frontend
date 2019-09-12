import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import styles from './Navbar.module.css';

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className={styles.container}>
          <ul>
            <li>
              <Button size="large" type="primary" ghost href="/login">
                Login
              </Button>
            </li>
            <li>
              <Button size="large" type="primary" href="/dashboard">
                Dashboard
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
