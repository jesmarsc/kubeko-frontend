import React, { Fragment } from 'react';
import { Menu, Col, Button } from 'antd';
import Lottie from 'react-lottie';
import styles from './App.module.css';
import animation from './assets/banner.json';

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const rowStyle = {
    backgroundColor: '#F7F9FA',
    height: '85vh',
    display: 'flex',
    flexWrap: 'wrap-reverse',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  };
  const colStyle = { backgroundColor: 'transparent', textAlign: 'left' };
  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Button type="primary" ghost>
              Login
            </Button>
          </li>
        </ul>
      </nav>
      <div
        style={{
          ...rowStyle,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%',
        }}
      >
        <Col style={colStyle} lg={10}>
          <h1 className={styles.headerText}>
            <span className={styles.Span}>Kubernetes</span>
            <span className={styles.Span}>Konekt</span>
            <span className={styles.subSpan}>Cloud, Made Simple.</span>
          </h1>
          <Button type="primary" size="large" shape="round">
            Sign Up
          </Button>
        </Col>
        <Col style={colStyle} lg={10}>
          <Lottie
            isClickToPauseDisabled={true}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              padding: '0px',
            }}
            options={defaultOptions}
          />
        </Col>
      </div>
      <div
        style={{
          ...rowStyle,
          backgroundColor: '#2F54EB',
        }}
      ></div>
    </Fragment>
  );
}

export default App;
