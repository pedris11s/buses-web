import React from 'react';
import {Badge} from "reactstrap";

export default class BadgeRole extends React.Component{

  render(){

    let badge = '';
    let role = this.props.role;
    console.log(role);
    switch(role){
      case 'root':
        badge = <Badge className="mr-1" color="dark" pill>{role}</Badge>
        break;
      case 'admin':
        badge = <Badge className="mr-1" color="info" pill>{role}</Badge>
        break;
      case 'cliente':
        badge = <Badge className="mr-1" color="success" pill>{role}</Badge>
        break;
    }

    return(
      <div>
        {badge}
      </div>
  )};
}
