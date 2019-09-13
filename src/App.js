import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Banner from './components/Landing/Banner';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Banner} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
