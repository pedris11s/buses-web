import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Row } from 'reactstrap';
import API from '../../services/api';
import {Link} from 'react-router-dom';

import AuthService from '../../services/AuthService';
import BadgeDenuncia from '../utils/BadgeDenuncia';
const auth = new AuthService();

export default class ViewDenuncia extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      denuncia: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/denuncia/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const d = res.data;
        this.setState({ denuncia: d});
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDenuncia(text){

    const denuncia = {
        estado: text
    }

    const id = this.state.denuncia.id.toString();
    API.put(`/denuncia/${id}`, denuncia, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.props.history.replace(`/denuncias`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    let bus = (this.state.denuncia.bus === undefined || this.state.denuncia.bus === null || this.state.denuncia.bus.length === 0) ? "Desconocido" : this.state.denuncia.bus;
    return (
      <div>
        <div className="animated fadeIn">
            <Row>
                <Col>
                    <div class="pull-right">
                        <Button size="sm" color="success" disabled={(this.state.denuncia.estado == 'aprobada' ? true: false)} onClick={() => this.handleDenuncia("aprobada")}><i className="fa fa-check"></i>&nbsp;Aceptar</Button>
                        &nbsp;
                        <Button size="sm" color="danger" disabled={(this.state.denuncia.estado == 'denegada' ? true: false)} onClick={() => this.handleDenuncia("denegada")}><i className="fa fa-close"></i>&nbsp;Denegar</Button>
                    </div>
                </Col>
            </Row>
            <br/>

          <Row>
            <Col xs={6}>
              <Card>
                <CardHeader>
                  <strong><i className="icon-info pr-1"></i>Denuncia id: {this.state.denuncia.id}</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Table responsive striped>
                        <tbody>
                        <tr>
                          <td>Estado:</td>
                          <td><strong><BadgeDenuncia text={this.state.denuncia.estado} /></strong></td>
                        </tr>
                        <tr>
                          <td>Bus:</td>
                          <td><strong>{bus.nobus} </strong></td>
                        </tr>
                        <tr>
                          <td>Creada:</td>
                          <td><strong>{this.state.denuncia.createdAt}</strong></td>
                        </tr>
                        <tr>
                          <td>Modificada:</td>
                          <td><strong>{this.state.denuncia.updatedAt}</strong></td>
                        </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xs={6}>
              <Card>
                <CardHeader>
                  <strong><i className="fa fa-file-text-o"></i> Texto</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                        <p>{this.state.denuncia.texto}</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}
