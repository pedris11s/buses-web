import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Row } from 'reactstrap';
import API from '../../services/api';
import {Link} from 'react-router-dom';

import AuthService from '../../services/AuthService';
import LikeButton from "../utils/LikeButton";
const auth = new AuthService();

export default class ViewCooperativa extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cooperativa: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/cooperativa/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const coop = res.data;
        this.setState({ cooperativa: coop});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {

    let oficina = (this.state.cooperativa.oficina === undefined || this.state.cooperativa.oficina === null || this.state.cooperativa.oficina.length === 0) ? "Desconocida" : this.state.cooperativa.oficina;
    let buses = (this.state.cooperativa.buses === undefined ||
                        this.state.cooperativa.buses === null ||
                        this.state.cooperativa.buses.length === 0) ?
                        <strong>No asignados.</strong>
                        : this.state.cooperativa.buses.map(bus =>
                          <tr>
                            <td>{bus.nobus}</td>
                            <td><Link to={`/buses/view/${bus.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link></td>
                          </tr>
                        );

    let rutas = (this.state.cooperativa.rutas === undefined ||
                this.state.cooperativa.rutas === null ||
                this.state.cooperativa.rutas.length === 0) ?
                <strong>No asignadas.</strong>
                : this.state.cooperativa.rutas.map(ruta =>
                  <tr>
                    <td>{ruta.nombre}</td>
                    <td><Link to={`/rutas/view/${ruta.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link></td>
                  </tr>
                );

    return (
      <div>
        <Row>
          <Col>
            <div class="pull-right">
              <Link to={`/coops/edit/${this.state.cooperativa.id}`} >
                <Button size="sm" color="success"><i className="cui-pencil"></i>&nbsp;Editar cooperativa</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>

        <div className="animated fadeIn">
          <Row>
            <Col xs={6}>
              <Card>
                <CardHeader>
                  <strong><i className="icon-info pr-1"></i>Cooperativa id: {this.state.cooperativa.id}</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Table responsive striped>
                        <tbody>
                        <tr>
                          <td>Nombre:</td>
                          <td><strong>{this.state.cooperativa.nombre} </strong></td>
                        </tr>
                        <tr>
                          <td>Pais:</td>
                          <td><strong>{this.state.cooperativa.pais} </strong></td>
                        </tr>
                        <tr>
                          <td>Provincia:</td>
                          <td><strong>{this.state.cooperativa.provincia}</strong></td>
                        </tr>
                        <tr>
                          <td>Ciudad:</td>
                          <td><strong>{this.state.cooperativa.ciudad}</strong></td>
                        </tr>
                        <tr>
                          <td>Parroquia:</td>
                          <td><strong>{this.state.cooperativa.parroquia}</strong></td>
                        </tr>
                        <tr>
                          <td>Modalidad:</td>
                          <td><strong>{this.state.cooperativa.modalidad}</strong></td>
                        </tr>
                        <tr>
                          <td>Oficina:</td>
                          <td><strong>{(oficina.nombre === undefined) ? "(-)" : oficina.nombre}</strong></td>
                        </tr>
                        <tr>
                          <td>Tipo:</td>
                          <td><strong>{this.state.cooperativa.tipo}</strong></td>
                        </tr>
                        <tr>
                          <td>Creada:</td>
                          <td><strong>{this.state.cooperativa.createdAt}</strong></td>
                        </tr>
                        <tr>
                          <td>Modificada:</td>
                          <td><strong>{this.state.cooperativa.updatedAt}</strong></td>
                        </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col xs="3">
              <Card>
                <CardHeader className="text-center">
                  <i className="fa fa-bus"></i> Buses
                </CardHeader>
                <CardBody className="text-center">
                  <Table responsive hover>
                    <tbody>
                    {buses}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col xs={3}>
              <Card>
                <CardHeader className="text-center">
                  <i className="icon-cursor"></i> Rutas
                </CardHeader>
                <CardBody className="text-center">
                  <Table responsive hover>
                    <tbody>
                    {rutas}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
