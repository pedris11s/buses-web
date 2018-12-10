import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

import { Nav, NavItem, NavLink} from 'reactstrap';

import AuthService from '../../services/AuthService';
import withAuth from '../../services/withAuth';
const Auth = new AuthService();

class DefaultLayout extends Component {

  /*componentWillMount(){
    if(!Auth.loggedIn()) {
      //alert("NO ESTAS LOGUEADO");
      this.props.history.replace('/login');
    }
  }*/

  handleLogout(){
    Auth.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
          <Nav navbar>
            <NavItem className="d-md-down-none">
              <NavLink href="#" onClick={this.handleLogout.bind(this)}><i className="fa fa-sign-out" ></i> Salir&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
            </NavItem>
          </Nav>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} redirect={route.redirect} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default withAuth(DefaultLayout);
