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

    //FIXME cuando se borra la cooperativa asociada se forma locura
    console.log("hola");
    console.log(this.state.oficina.cooperativa);
    console.log("fin");
    let cooperativa = (this.state.oficina.cooperativa === undefined || this.state.oficina.cooperativa === null || this.state.oficina.cooperativa.length === 0) ? "Desconocida" : this.state.oficina.cooperativa;

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

                  <Col xs="6">
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
                      </tbody>
                    </Table>
                  </Col>

                  <Col xs="6">
                    <Table responsive striped hover>
                      <tbody>
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
                </Row>

                <Row>
                  <Col>
                    <Table responsive striped hover>
                      <tbody>
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
