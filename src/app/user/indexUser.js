import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import ListarClientes from "./ListarClientes";
import ListarSuperUsers from "./ListarSuperUsers";

export default class indexUser extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to="/users/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus"></i>&nbsp;Adicionar admin user</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarSuperUsers/>
        <ListarClientes/>
      </div>
    )
  }
}
