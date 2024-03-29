import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class ViewRuta extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ruta: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/ruta/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.setState({ ruta: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){


    let buses = (this.state.ruta.buses === undefined ||
                        this.state.ruta.buses === null ||
                        this.state.ruta.buses.length === 0) ?
                        <strong>No asignados.</strong>
                        : this.state.ruta.buses.map(b =>
                          <tr>
                            <td>{b.nobus}</td>
                            <td><Link to={`/buses/view/${b.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link></td>
                          </tr>
                        );
    let cooperativas = (this.state.ruta.cooperativas === undefined ||
                        this.state.ruta.cooperativas === null ||
                        this.state.ruta.cooperativas.length === 0) ?
                        <strong>No asignadas.</strong>
                        : this.state.ruta.cooperativas.map(coop =>
                          <tr>
                            <td>{coop.nombre}</td>
                            <td><Link to={`/coops/view/${coop.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link></td>
                          </tr>
                        );

    //console.log(this.state.ruta.cooperativas);
    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <div class="pull-right">
              <Link to={`/rutas/edit/${this.state.ruta.id}`} >
                <Button size="sm" color="success"><i className="cui-pencil"></i>&nbsp;Editar ruta</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col xs="6">
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Ruta id: {this.state.ruta.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Table responsive striped>
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
                        <td>Creada:</td>
                        <td><strong>{this.state.ruta.createdAt}</strong></td>
                      </tr>
                      <tr>
                        <td>Modificada:</td>
                        <td><strong>{this.state.ruta.updatedAt}</strong></td>
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
                <i className="icon-home"></i> Cooperativas
              </CardHeader>
              <CardBody className="text-center">
                <Table responsive hover>
                  <tbody>
                    { cooperativas }
                  </tbody>
                </Table>

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
                  { buses }
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

