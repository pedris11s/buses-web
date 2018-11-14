import React from 'react';
import axios from 'axios';

import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {API_ROOT} from "../../config";
import API from '../../services/api';

export default class ViewBus extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      bus: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/bus/${id}`)
      .then(res => {
        const b = res.data;
        //console.log(r);
        this.setState({ bus: b});
      });
  }

  render(){

   /* let cooperativa = (this.state.ruta.cooperativa === undefined || this.state.ruta.cooperativa === null) ? "Desconocida" : this.state.ruta.cooperativa;
    let buses = (this.state.ruta.buses === undefined || this.state.ruta.buses.length === 0) ? "No hay buses." : this.state.ruta.buses;

    console.log("ATRIBUTO BUSES ES UNA DUDA!!!");
    console.log(this.state.ruta);*/

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Bus id: {this.state.bus.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="9">
                    <Table responsive striped hover>
                      <tbody>
                      <tr>
                        <td>Placa:</td>
                        <td><strong>{this.state.bus.placa}</strong></td>
                      </tr>
                      <tr>
                        <td>No. Bus:</td>
                        <td><strong>{this.state.bus.nobus}</strong></td>
                      </tr>
                      <tr>
                        <td>Frecuencia:</td>
                        <td><strong>{this.state.bus.frecuencia}</strong></td>
                      </tr>
                      <tr>
                        <td>Marca:</td>
                        <td><strong>{this.state.bus.marca}</strong></td>
                      </tr>
                      <tr>
                        <td>Cooperativa:</td>
                        <td><strong>{this.state.bus.placa}</strong></td>
                      </tr>

                      </tbody>
                    </Table>
                  </Col>

                  <Col xs="3">
                    <Card>
                      <CardHeader className="text-center">
                        <i className="icon-cursor"></i> Rutas
                      </CardHeader>
                      <CardBody className="text-center">

                      </CardBody>
                    </Card>

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

