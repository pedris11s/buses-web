import React, { Component } from 'react';
import AuthService from './AuthService';
import {API_ROOT} from "../config";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(`${API_ROOT}`);
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const profile = Auth.getProfile()
          this.setState({
            user: profile
          })
        }
        catch(err){
          Auth.logout()
          this.props.history.replace('/login')
        }
      }
    }
    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        )
      }
      else {
        return null
      }
    }
  }
}
