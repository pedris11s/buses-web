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
        this.setState({oficina:off});
      });
  }

  render(){

    let cooperativas = (this.state.oficina.cooperativas === undefined ||
                        this.state.oficina.cooperativas === null ||
                        this.state.oficina.cooperativas.length === 0) ?
                          <strong>No asignada</strong>
                        : this.state.oficina.cooperativas.map(coop =>
                            <tr>
                              <td>{coop.nombre}</td>
                            </tr>
                          );

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
                        <td>Ciudad:</td>
                        <td><strong>{this.state.oficina.ciudad}</strong></td>
                      </tr>
                      <tr>
                        <td>Direccion:</td>
                        <td><strong>{this.state.oficina.direccion}</strong></td>
                      </tr>
                      <tr>
                        <td>Telefono:</td>
                        <td><strong>{this.state.oficina.telefono}</strong></td>
                      </tr>
                      <tr>
                        <td>Facebook:</td>
                        <td><strong>{this.state.oficina.facebook}</strong></td>
                      </tr>
                      <tr>
                        <td>Whatsapp:</td>
                        <td><strong>{this.state.oficina.whatsapp}</strong></td>
                      </tr>
                      </tbody>
                    </Table>
                  </Col>

                  <Col xs="3">
                    <Card>
                      <CardHeader className="text-center">
                        <i className="fa fa-industry"></i> Cooperativas
                      </CardHeader>
                      <CardBody className="text-center">
                        <Table responsive striped hover>
                          <tbody>
                            {cooperativas}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col>
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
