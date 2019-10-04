import React, { Fragment } from 'react';
import Banner from './Banner/Banner';
import LandingNav from './Navbar/LandingNav';
import styles from './LandingPage.module.css';

const Landing = () => {
  return (
    <Fragment>
      <LandingNav />
      <Banner />
    </Fragment>
  );
};

export default Landing;
