import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

import LandingPage from './components/Landing';
import DashboardPage from './components/Dashboard';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import { withAuthentication } from './components/Session';

import * as ROUTES from './constants/routes';

const k8sProxy = axios.create({
  baseURL: 'https://us-central1-kubeko.cloudfunctions.net/proxy'
});

const k8sUpload = axios.create({
  baseURL: 'https://us-central1-kubeko.cloudfunctions.net/uploadFile',
  method: 'POST'
});

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
        <Route path={ROUTES.LANDING} exact component={LandingPage} />
        <Route path={ROUTES.DASH} component={DashboardPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={LoginPage} />
        <Redirect path={'/'} to="/" />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default withAuthentication(App);
export { k8sProxy, k8sUpload };
