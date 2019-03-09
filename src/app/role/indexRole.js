import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import ListarRoles from "./ListarRoles";

export default class indexRole extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to="/roles/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus"></i>&nbsp;Adicionar role</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarRoles/>
      </div>
    )
  }
}
