import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Landing} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
