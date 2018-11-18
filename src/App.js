import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Page404, Page500, Register } from './views/Pages';
import Login from './app/Login';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
