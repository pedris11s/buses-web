import React from 'react';
import {Button} from "reactstrap";

export default class LikeButton extends React.Component{
  constructor(props){
    super();

    this.state = {
      icon: '',
      color: ''
    }

    this.buttonAction = this.buttonAction.bind(this);
    this.like = this.like.bind(this);
  }

  //this.props.cooperativa && this.props.user

  componentDidMount(){


  }

  like(){
    let user = this.props.user, coop = this.props.cooperativa;
    alert("hola");
  }

  buttonAction(){
    this.like();
  }

  render(){
    return (
      <Button onClick={() => this.buttonAction()} size="sm" color="light"><i className="fa fa-thumbs-o-up"></i></Button>
    )
  }
}
