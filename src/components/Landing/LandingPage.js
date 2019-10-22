import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar/LandingNav';
import { Button } from 'antd';
import Lottie from 'react-lottie';
import animation from '../../assets/banner.json';
import classes from './LandingPage.module.scss';
import * as ROUTES from '../../constants/routes';

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {}
  };
  return (
    <Fragment>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.background} />
        <header className={classes.header}>
          <div className={classes.wrapper}>
            <span className={classes.title}>Kubernetes Konekt</span>
            <span className={classes.subtitle}>Cloud. Made simple.</span>
            <Link to={ROUTES.SIGN_UP}>
              <Button icon="form" shape="round" size="large" type="primary">
                Sign Up
              </Button>
            </Link>
          </div>
          <Lottie
            isClickToPauseDisabled={true}
            style={{
              maxHeight: '100%',
              maxWidth: '100%'
            }}
            options={defaultOptions}
          />
        </header>
      </div>
    </Fragment>
  );
};

export default Landing;
