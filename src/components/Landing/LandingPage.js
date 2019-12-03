import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { Button } from 'antd';

import workloadDash from '@assets/workload-dash-cropped.png';
import clusterDash from '@assets/cluster-dash-cropped.png';
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
        <header className={classes.banner}>
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
              maxHeight: '100%',
              gridArea: 'b',
            }}
            options={defaultOptions}
          />
        </header>
        <section className={classes.section}>
          <h1 className={classes.section__title}>Why Kubeko?</h1>
          <div className={classes.features}>
            <div className={classes.featureCard}>
              <img
                className={classes.featureCard__image}
                src={workloadDash}
                alt="alt text"
              />
              <h1 className={classes.featureCard__feature}>Create Workloads</h1>
              <h2 className={classes.featureCard__description}>
                As simple as uploading a YAML file!
              </h2>
            </div>
            <div className={classes.featureCard}>
              <img
                className={classes.featureCard__image}
                src={clusterDash}
                alt="alt text"
              />
              <h1 className={classes.featureCard__feature}>Manage Users</h1>
              <h2 className={classes.featureCard__description}>
                See who is using your cluster in real-time!
              </h2>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Landing;
