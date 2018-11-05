import React from 'react';
import axios from 'axios';

import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {API_ROOT} from "../../config";

export default class ViewRuta extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ruta: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    axios.get(`${API_ROOT}/ruta/${id}`)
      .then(res => {
        const r = res.data;
        //console.log(r);
        this.setState({ ruta: r});
      });
  }

  render(){

    let cooperativa = (this.state.ruta.cooperativa === undefined) ? "Desconocida" : this.state.ruta.cooperativa;
    let buses = (this.state.ruta.buses === undefined || this.state.ruta.buses.length === 0) ? "No hay buses." : this.state.ruta.buses;

    console.log("ATRIBUTO BUSES ES UNA DUDA!!!");
    console.log(this.state.ruta);

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Ruta id: {this.state.ruta.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="9">
                    <Table responsive striped hover>
                      <tbody>
                      <tr>
                        <td>Nombre:</td>
                        <td><strong>{this.state.ruta.nombre}</strong></td>
                      </tr>
                      <tr>
                        <td>Coo. Origen:</td>
                        <td><strong>{this.state.ruta.coo_origen}</strong></td>
                      </tr>
                      <tr>
                        <td>Coo.Destino:</td>
                        <td><strong>{this.state.ruta.coo_destino}</strong></td>
                      </tr>
                      <tr>
                        <td>Ciudad Origen:</td>
                        <td><strong>{this.state.ruta.ciudad_origen}</strong></td>
                      </tr>
                      <tr>
                        <td>Ciudad Destino:</td>
                        <td><strong>{this.state.ruta.ciudad_destino}</strong></td>
                      </tr>
                      <tr>
                        <td>Cooperativa:</td>
                        <td><strong>{ cooperativa.nombre }</strong></td>
                      </tr>

                      </tbody>
                    </Table>
                  </Col>

                  <Col xs="3">
                    <Card>
                      <CardHeader className="text-center">
                        <i className="fa fa-bus"></i> Buses
                      </CardHeader>
                      <CardBody className="text-center">
                        { buses }
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

