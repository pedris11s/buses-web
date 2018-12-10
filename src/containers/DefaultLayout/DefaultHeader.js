import React, { Component } from 'react';
import { Badge, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logoPRO1.png'
import logoside from '../../assets/img/brand/logoproicono.png'

import AuthService from '../../services/AuthService';
import API from "../../services/api";
const auth = new AuthService();

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: ''
    }
  }

  componentDidMount(){
    const id = auth.getProfile().id.toString();
    API.get(`/user/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const u = res.data;
        console.log(res.data);
        this.setState({user:u});
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 100, height: 40, alt: 'Poder3.0 Logo' }}
          minimized={{ src: logoside, width: 50, height: 40, alt: 'Poder3.0 Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href={`/users/view/${this.state.user.id}`}><i className="icon-user"></i> &nbsp;{this.state.user.username}&nbsp;&nbsp;&nbsp;&nbsp;</NavLink>
          </NavItem>
          {/*<NavItem className="d-md-down-none">*/}
            {/*<NavLink href="#"><i className="fa fa-user"></i></NavLink>*/}
          {/*</NavItem>*/}
          {/*<NavItem className="d-md-down-none">*/}
            {/*<NavLink href="#"><i className="fa fa-wrench"></i></NavLink>*/}
          {/*</NavItem>*/}
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
