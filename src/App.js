import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Landing from './components/Landing/LandingGrid';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import AdminPage from './components/Admin';
import { withAuthentication } from './components/Session';

import * as ROUTES from './constants/routes';

const App = () => (
  <Fragment>
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="Description"
          content="Deploy containers and manage Kubernetes clusters"
        />
        <title>Kubernetes Konekt</title>
        <html lang="en" />
      </Helmet>
    </HelmetProvider>
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.LANDING} exact component={Landing} />
        <Route path={ROUTES.DASH} component={Dashboard} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={LoginPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default withAuthentication(App);
