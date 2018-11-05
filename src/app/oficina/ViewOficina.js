import React from 'react';
import axios from "axios";
import {API_ROOT} from "../../config";

import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

export default class ViewOficina extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      oficina: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    axios.get(`${API_ROOT}/oficina/${id}`)
      .then(res => {
        const off = res.data;
        //console.log(r);
        this.setState({oficina:off});
      });
  }

  render(){
    
    console.log(this.state.oficina);
    let cooperativa = (this.state.oficina.cooperativa === undefined) ? "Desconocida" : this.state.oficina.cooperativa;

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Oficina id: {this.state.oficina.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="9">
                    <Table responsive striped hover>
                      <tbody>
                      <tr>
                        <td>Nombre:</td>
                        <td><strong>{this.state.oficina.nombre}</strong></td>
                      </tr>
                      <tr>
                        <td>Coo. Origen:</td>
                        <td><strong>{this.state.oficina.ciudad}</strong></td>
                      </tr>
                      <tr>
                        <td>Coo.Destino:</td>
                        <td><strong>{this.state.oficina.direccion}</strong></td>
                      </tr>
                      <tr>
                        <td>Ciudad Origen:</td>
                        <td><strong>{this.state.oficina.telefono}</strong></td>
                      </tr>
                      <tr>
                        <td>Ciudad Destino:</td>
                        <td><strong>{this.state.oficina.facebook}</strong></td>
                      </tr>
                      <tr>
                        <td>Ciudad Destino:</td>
                        <td><strong>{this.state.oficina.whatsapp}</strong></td>
                      </tr>
                      <tr>
                        <td>Cooperativa:</td>
                        <td><strong>{cooperativa.nombre}</strong></td>
                      </tr>

                      </tbody>
                    </Table>
                    <Button color="success" block><i className="icon icon-pencil"></i> Edit</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
