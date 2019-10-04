import React, { Fragment } from 'react';
import { Col, Button } from 'antd';
import Lottie from 'react-lottie';
import animation from '../../../assets/banner.json';

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
    <div className={styles.Row}>
      <Col xs={16} md={10}>
        <h1 className={styles.Header}>
          <span className={styles.Span}>Kubernetes</span>
          <span className={styles.Span}>Konekt</span>
          <span className={styles.SubSpan}>Cloud, Made Simple.</span>
        </h1>
        <Button type="primary" size="large">
          Sign Up
        </Button>
      </Col>
      <Col xs={24} sm={18} md={10}>
        <Lottie
          isClickToPauseDisabled={true}
          style={{
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          options={defaultOptions}
        />
      </Col>
    </div>
  );
};

export default Banner;
