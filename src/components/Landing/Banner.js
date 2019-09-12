import React from 'react';
import { Col, Button } from 'antd';
import Lottie from 'react-lottie';
import animation from '../../assets/banner.json';

import styles from './Banner.module.css';

const Banner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className={styles.Row}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%',
      }}
    >
      <Col lg={10}>
        <h1>
          <span className={styles.Span}>Kubernetes</span>
          <span className={styles.Span}>Konekt</span>
          <span className={styles.subSpan}>Cloud, Made Simple.</span>
        </h1>
        <Button type="primary" size="large" shape="round">
          Sign Up
        </Button>
      </Col>
      <Col lg={10}>
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
  );
};

export default Banner;
