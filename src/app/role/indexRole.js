import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import ListarRoles from "./ListarRoles";

export default class indexRole extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <a href="/roles/view/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus-square"></i>&nbsp;Adicionar role</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarRoles/>
      </div>
    )
  }
}
