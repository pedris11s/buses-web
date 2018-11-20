import React from 'react';

import ListarRutas from './ListarRutas';

import { Button, Row, Col } from 'reactstrap';

export default class indexRuta extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <a href="/rutas/view/add" >
                <Button size="sm" color="success"><i className="fa fa-plus-square"></i>&nbsp;Add ruta</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarRutas/>
      </div>
    );
  }

}
