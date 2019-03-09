import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import Login from './app/auth/Login';
import Register from './app/auth/Register';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Login Page" component={Register} />
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
