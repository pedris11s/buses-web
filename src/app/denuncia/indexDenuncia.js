import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import ListarDenuncias from './ListarDenuncias';

export default class indexDenuncia extends React.Component{
  render(){
    return(
      <div>
        <ListarDenuncias/>
      </div>
    );
  }

}
