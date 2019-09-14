import React, { Fragment } from 'react';
import Banner from './Banner';
import LandingNav from './Navbar/LandingNav';

const Landing = () => {
  return (
    <Fragment>
      <LandingNav />
      <Banner />
    </Fragment>
  );
};

export default Landing;
