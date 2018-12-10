import React from 'react';
import { Table, Form, Input, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class AddRuta extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      coo_origen: '',
      coo_destino: '',
      ciudad_origen: '',
      ciudad_destino: '',
      bus_ruta: '',
      coop_ruta: [],
      cooperativas: [],
      buses: [],
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleCooOrigenChange = this.handleCooOrigenChange.bind(this);
    this.handleCooDestinoChange = this.handleCooDestinoChange.bind(this);
    this.handleCiudadOrigenChange = this.handleCiudadOrigenChange.bind(this);
    this.handleCiudadDestinoChange = this.handleCiudadDestinoChange.bind(this);
    this.handleCoopChange = this.handleCoopChange.bind(this);
    this.handleBusChange = this.handleBusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    API.get(`/cooperativa`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const coops = res.data;
        if(coops.length > 0)
          this.setState(
            {
              cooperativas: coops,
              coop_ruta: coops[0].id
            });
      })
      .catch(err => {
        console.log(err);
      });

    API.get(`/bus`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const b = res.data;
        if(b.length > 0)
          this.setState(
            {
              buses: b,
              bus_ruta: b[0].id
            });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleNombreChange = event => {
    this.setState({ nombre: event.target.value, });
  }

  handleCooOrigenChange = event => {
    this.setState({ coo_origen: event.target.value, });
  }

  handleCooDestinoChange = event => {
    this.setState({ coo_destino: event.target.value, });
  }

  handleCiudadOrigenChange = event => {
    this.setState({ ciudad_origen: event.target.value, });
  }

  handleCiudadDestinoChange = event => {
    this.setState({ ciudad_destino: event.target.value, });
  }

  handleBusChange = event => {
    this.setState({ bus_ruta: event.target.value, });
  }

  handleCoopChange = event => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({coop_ruta: value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const ruta = {
      nombre: this.state.nombre,
      coo_origen: this.state.coo_origen,
      coo_destino: this.state.coo_destino,
      ciudad_origen: this.state.ciudad_origen,
      ciudad_destino: this.state.ciudad_destino,
      cooperativas: this.state.coop_ruta,
      bus: this.state.bus_ruta,
    };

    API.post(`/ruta/`, ruta, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.props.history.push('/rutas');
      })
      .catch(err => {
        console.log(err);
      });


  }

  render(){
    return (
      <div>

      <div className="animated fadeIn">
        <Form onSubmit={this.handleSubmit} className="form-horizontal">
          <Row>
            <Col xs="9">
              <Card>
                <CardHeader>
                  <i className="fa fa-plus"></i> <strong>Adicionar Ruta</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <Table responsive striped hover>
                        <tbody>
                        <tr>
                          <td>Nombre:</td>
                          <td><Input type="text" value={this.state.nombre} onChange={this.handleNombreChange} required/></td>
                        </tr>
                        <tr>
                          <td>Coo. Origen:</td>
                          <td><Input type="text" value={this.state.coo_origen} onChange={this.handleCooOrigenChange} required/></td>
                        </tr>
                        <tr>
                          <td>Coo.Destino:</td>
                          <td><Input type="text" value={this.state.coo_destino} onChange={this.handleCooDestinoChange} required/></td>
                        </tr>
                        <tr>
                          <td>Ciudad Origen:</td>
                          <td><Input type="text" value={this.state.ciudad_origen} onChange={this.handleCiudadOrigenChange} required/></td>
                        </tr>
                        <tr>
                          <td>Ciudad Destino:</td>
                          <td><Input type="text"  value={this.state.ciudad_destino} onChange={this.handleCiudadDestinoChange} required/></td>
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
                  <i className="fa fa-bus"></i> Bus
                </CardHeader>
                <CardBody className="text-center">
                  <Input type="select" onChange={this.handleBusChange} required>
                    { this.state.buses.map( b => <option key={b.id} value={b.id}>{b.nobus}</option>) }
                  </Input>
                </CardBody>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <i className="icon-home"></i> Cooperativas
                </CardHeader>
                <CardBody className="text-center">
                  <Input type="select" multiple onChange={this.handleCoopChange} required>
                    { this.state.cooperativas.map( coop => <option key={coop.id} value={coop.id}>{coop.nombre}</option>) }
                  </Input>
                </CardBody>
              </Card>

              <Button type="submit" color="primary" block><i className="fa fa-plus"></i> Adicionar</Button>
            </Col>
          </Row>
        </Form>
      </div>
      </div>
    );
  }
}
