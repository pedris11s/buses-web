import React from 'react';
import { Alert, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from "react-router-dom";
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class ListarOficinas extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      oficinas: [],

      alertVisible: false,
      alertText: ''
    }

    this.deleteOficina = this.deleteOficina.bind(this);
  }

  componentDidMount(){
    API.get(`/oficina`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const off = res.data;
        this.setState({oficinas: off});
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteOficina(id){
    API.delete(`/oficina/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = this.state.oficinas.filter(r => r.id !== id);
        this.setState({oficinas: arr});
      })
      .catch(err => {
        this.setState({
          alertVisible: true,
          alertText: err.toString()
        });
      });
  }

  dissmissAlert(){
    this.setState({alertVisible: false});
  }

  render(){
    return (
      <div className="animated fadeIn">
        <Alert isOpen={this.state.alertVisible} toggle={this.dissmissAlert.bind(this)} color="danger" className="text-center">
          {this.state.alertText}
        </Alert>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-briefcase"></i> <strong>Lista de Oficinas</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.oficinas.map( (oficina, index) => (
                        <tr key={index} className="text-center">
                          <td>{oficina.nombre}</td>
                          <td>{oficina.ciudad}</td>
                          <td>{oficina.direccion}</td>
                          <td>{oficina.telefono}</td>
                          <td>
                            <Link to={`/oficinas/view/${oficina.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                            &nbsp;
                            <Link to={`/oficinas/edit/${oficina.id}`}><Button size="sm" color="success"><i className="icon-pencil"></i></Button></Link>
                            &nbsp;
                            <Button onClick={() => this.deleteOficina(oficina.id)} size="sm" color="danger"><i className="fa fa-trash"></i></Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
