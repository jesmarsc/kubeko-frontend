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
        <header className={classes.header}>
          <div className={classes.wrapper}>
            <h1 className={classes.title}>Kubernetes Konekt</h1>
            <h2 className={classes.subtitle}>Cloud. Made simple.</h2>
            {authUser ? (
              <Link to={ROUTES.WORKLOADS}>
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
              height: '100%',
              gridArea: 'b',
            }}
            options={defaultOptions}
          />
        </header>
      </div>
    </Fragment>
  );
};

export default Landing;
