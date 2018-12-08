import React from 'react';
import {Button} from "reactstrap";
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class LikeButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      icon: '',
      color: '',
    };
    this.buttonAction = this.buttonAction.bind(this);
  }

  componentDidMount(){
    API.get(`/${this.props.modelo}/${this.props.id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        let users = res.data.users.filter(r => r.id === auth.getProfile().id);
        console.log(users, res.data.users);
        if(users.length > 0) {
          this.setState({
            icon: 'fa fa-thumbs-o-down',
            color: 'dark',
          });
        }
        else {
          this.setState({
            icon: 'fa fa-thumbs-o-up',
            color: 'light',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  buttonAction(){

    let action = (this.state.color === 'dark') ? 'dislike' : 'like';
    let data = {
      userId: auth.getProfile().id,
      modeloId: this.props.id,
      action: action
    };

    console.log(data);

    API.put(`/${this.props.modelo}/vote`, data, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        if (action === 'like')
          this.setState({
            color: 'dark',
            icon: 'fa fa-thumbs-o-down'
          });
        else
          this.setState({
            color: 'light',
            icon: 'fa fa-thumbs-o-up'
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
      <Button onClick={() => this.buttonAction()} size="sm" color={this.state.color}><i className={this.state.icon}></i></Button>
    )
  }
}
