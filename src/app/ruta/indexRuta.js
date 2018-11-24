import React from 'react';
import {Link} from 'react-router-dom';
import ListarRutas from './ListarRutas';
import { Button, Row, Col } from 'reactstrap';

export default class indexRuta extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to="/rutas/add" >
                <Button size="sm" color="primary"><i className="fa fa-plus-square"></i>&nbsp;Adicionar ruta</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarRutas/>
      </div>
    );
  }

}
