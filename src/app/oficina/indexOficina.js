import React from 'react';
import ListarOficinas from "./ListarOficinas";
import { Button, Row, Col } from 'reactstrap';

export default class indexOficina extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <a href="/oficinas/view/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus-square"></i>&nbsp;Add oficina</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarOficinas/>
      </div>
    )
  }
}
