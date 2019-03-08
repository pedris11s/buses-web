import React from 'react';
import {Badge} from "reactstrap";

export default class BadgeDenuncia extends React.Component{

  render(){

    let color = '', text = this.props.text;
    switch(text){
      case 'pending':
        color = "warning";
        break;
      case 'aprobada':
        color = "success"
        break;
      case 'denegada':
        color = "danger"
        break;
      default:
        color = "light"
        break;
    }

    return(
      <div>
        <Badge className="mr-1" color={color} pill>{text}</Badge>
      </div>
  )};
}
