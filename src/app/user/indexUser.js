import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import ListarUsers from "./ListarUsers";
import ListarSuperUsers from "./ListarSuperUsers";

export default class indexUser extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <a href="/users/view/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus-square"></i>&nbsp;Add admin user</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarSuperUsers/>
        <ListarUsers/>
      </div>
    )
  }
}
