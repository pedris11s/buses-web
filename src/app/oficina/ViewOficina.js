import React from 'react';
import axios from "axios";
import {API_ROOT} from "../../config";

import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import AddCoopOficina from './AddCoopOficina';

import CoopRow from '../ruta/ViewRuta'

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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Oficina id: {this.state.oficina.id}</strong>
              </CardHeader>
              <CardBody>
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

                  <CoopRow coopRowVisibility={true} cooperativa={this.state.oficina.cooperativa}/>

                  </tbody>
                </Table>

                <AddCoopOficina oficina={this.state.oficina}/>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
