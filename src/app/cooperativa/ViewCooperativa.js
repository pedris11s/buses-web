import React from 'react';
import { Button, Table, Card, CardBody, CardFooter, CardHeader, Col, Form, Label, FormGroup, Input, Row } from 'reactstrap';
import axios from "axios";
import {API_ROOT} from "../../config";
import {Redirect} from "react-router-dom";

export default class ViewCooperativa extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cooperativa: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    axios.get(`${API_ROOT}/cooperativa/${id}`)
      .then(res => {
        const coop = res.data;
        this.setState({ cooperativa: coop});
      });
  }

  render() {

    let oficina = (this.state.cooperativa.oficina === undefined || this.state.cooperativa.oficina === null || this.state.cooperativa.oficina.length === 0) ? "Desconocida" : this.state.cooperativa.oficina;
    let buses = (this.state.cooperativa.buses === undefined ||
                        this.state.cooperativa.buses === null ||
                        this.state.cooperativa.buses.length === 0) ?
                        <strong>No asignado</strong>
                        : this.state.cooperativa.buses.map(bus =>
                          <tr>
                            <td>{bus.nobus}</td>
                          </tr>
                        );

    console.log(this.state.cooperativa.rutas);
    let rutas = (this.state.cooperativa.rutas === undefined ||
                this.state.cooperativa.rutas === null ||
                this.state.cooperativa.rutas.length === 0) ?
                <strong>POR ARREGLAR!!</strong>
                : this.state.cooperativa.rutas.map(ruta =>
                  <tr>
                    <td>{ruta.nombre}</td>
                  </tr>
                );


    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <Card>
                  <CardHeader>
                    <i className="fa fa-plus-square-o"></i> <strong>Crear Cooperativa</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="9">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Nombre:</td>
                            <td>{this.state.cooperativa.nombre} </td>
                          </tr>
                          <tr>
                            <td>Pais:</td>
                            <td>{this.state.cooperativa.pais} </td>
                          </tr>
                          <tr>
                            <td>Provincia:</td>
                            <td>{this.state.cooperativa.provincia}</td>
                          </tr>
                          <tr>
                            <td>Ciudad:</td>
                            <td>{this.state.cooperativa.ciudad}</td>
                          </tr>
                          <tr>
                            <td>Parroquia:</td>
                            <td>{this.state.cooperativa.parroquia} </td>
                          </tr>
                          <tr>
                            <td>Modalidad:</td>
                            <td>{this.state.cooperativa.modalidad}</td>
                          </tr>
                          <tr>
                            <td>Oficina:</td>
                            <td>{oficina.nombre}</td>
                          </tr>
                          <tr>
                            <td>Tipo:</td>
                            <td>{this.state.cooperativa.tipo}</td>
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
                            <Table responsive striped hover>
                              <tbody>
                              {buses}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>

                        <Card>
                          <CardHeader className="text-center">
                            <i className="icon-cursor"></i> Rutas
                          </CardHeader>
                          <CardBody className="text-center">
                            <Table responsive striped hover>
                              <tbody>
                                {rutas}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>

                        <Button color="success" block><i className="icon icon-pencil"></i> Edit</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
