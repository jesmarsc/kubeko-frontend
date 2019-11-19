import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { Button } from 'antd';

import Navbar from './Navbar/LandingNav';
import classes from './LandingPage.module.scss';
import animation from '@assets/banner.json';
import { AuthUserContext } from '@session';
import * as ROUTES from '@constants/routes';

const Landing = () => {
  const authUser = useContext(AuthUserContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {},
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
            {authUser ? (
              <Link to={ROUTES.DASH}>
                <Button icon="form" shape="round" size="large" type="primary">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to={ROUTES.SIGN_UP}>
                <Button icon="form" shape="round" size="large" type="primary">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
          <Lottie
            isClickToPauseDisabled={true}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
            options={defaultOptions}
          />
        </header>
      </div>
    </Fragment>
  );
};

export default Landing;
