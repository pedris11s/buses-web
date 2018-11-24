import React from 'react';
import ListarBuses from "./ListarBuses";
import {Link} from "react-router-dom";
import { Button, Row, Col } from 'reactstrap';

export default class indexBus extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to="/buses/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus-square"></i>&nbsp;Adicionar bus</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarBuses/>
      </div>
    )
  }
}
