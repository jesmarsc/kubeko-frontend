import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';

import * as ROUTES from './constants/routes';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.LANDING} exact component={Landing} />
          <Route path={ROUTES.DASH} component={Dashboard} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
