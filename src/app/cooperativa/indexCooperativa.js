import React from 'react';
import ListarCooperativas from "./ListarCooperativas";
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class indexCooperativa extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to="/coops/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus-square"></i>&nbsp;Adicionar cooperativa</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarCooperativas/>
      </div>
    );
  }

}
