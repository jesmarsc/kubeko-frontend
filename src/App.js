import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';
import AdminPage from './components/Admin';
import { withAuthentication } from './components/Session';

import * as ROUTES from './constants/routes';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={ROUTES.LANDING} exact component={Landing} />
      <Route path={ROUTES.DASH} component={Dashboard} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={LoginPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </Switch>
  </BrowserRouter>
);

export default withAuthentication(App);
