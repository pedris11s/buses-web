import React from 'react';
import {Link} from 'react-router-dom';
import ListarOficinas from "./ListarOficinas";
import { Button, Row, Col } from 'reactstrap';

export default class indexOficina extends React.Component{
  render(){
    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to="/oficinas/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus"></i>&nbsp;Adicionar oficina</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarOficinas/>
      </div>
    )
  }
}
