import React from 'react';

import ListarCooperativas from "./ListarCooperativas";
import { Button, Row, Col } from 'reactstrap';

export default class indexCooperativa extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <a href="/coops/view/add" >
                <Button size="sm" color="success"><i className="fa fa-plus-square"></i>&nbsp;Add cooperativa</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>
        <ListarCooperativas/>
      </div>
    );
  }

}
