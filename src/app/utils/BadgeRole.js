import React from 'react';
import {Badge} from "reactstrap";

export default class BadgeRole extends React.Component{

  render(){

    let color = '', role = this.props.role;
    switch(role){
      case 'root':
        color = "dark";
        break;
      case 'admin':
        color = "info"
        break;
      case 'cliente':
        color = "success"
        break;
      default:
        color = "light"
        break;
    }

    return(
      <div>
        <Badge className="mr-1" color={color} pill>{role}</Badge>
      </div>
  )};
}
