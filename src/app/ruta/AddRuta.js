import React from 'react';
import axios from 'axios';

import { Table, Form, Input, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {API_ROOT} from "../../config";

//TODO alert succesfull cuando se adiciona ruta

export default class AddRuta extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      coo_origen: '',
      coo_destino: '',
      ciudad_origen: '',
      ciudad_destino: '',
      coop_ruta: '',
      buses_ruta: [],
      cooperativas: [],
      buses: []
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleCooOrigenChange = this.handleCooOrigenChange.bind(this);
    this.handleCooDestinoChange = this.handleCooDestinoChange.bind(this);
    this.handleCiudadOrigenChange = this.handleCiudadOrigenChange.bind(this);
    this.handleCiudadDestinoChange = this.handleCiudadDestinoChange.bind(this);
    this.handleCoopRutaChange = this.handleCoopRutaChange.bind(this);
    this.handleBusesRutaChange = this.handleBusesRutaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/cooperativa`)
      .then(res => {
        const coops = res.data;
        if(coops.length > 0)
          this.setState(
            {
              cooperativas: coops,
              coop_ruta: coops[0].id
            });
      });

    axios.get(`${API_ROOT}/bus`)
      .then(res => {
        const buses = res.data;
        if(buses.length > 0)
          this.setState(
            {
              buses: buses,
            });
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

  handleCoopRutaChange = event => {
    this.setState({ coop_ruta: event.target.value, });
  }

  handleBusesRutaChange = event => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({buses_ruta: value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const ruta = {
      nombre: this.state.nombre,
      coo_origen: this.state.coo_origen,
      coo_destino: this.state.coo_destino,
      ciudad_origen: this.state.ciudad_origen,
      ciudad_destino: this.state.ciudad_destino,
      cooperativa: this.state.coop_ruta,
      buses: this.state.buses_ruta
    };

    axios.post(`${API_ROOT}/ruta/`, ruta)
      .then(res => {
        //this.props.addRuta(ruta);
        console.log(this.state.buses_ruta);
        this.setState({
          nombre: '',
          coo_origen: '',
          coo_destino: '',
          ciudad_destino: '',
          ciudad_origen: '',
          coop_ruta: [],
          buses_ruta: []
        });
        //console.log(this.props.rutas);
        this.props.history.push('/rutas/view');
      });


  }

  render(){
    return (
      <div>

      <div className="animated fadeIn">

        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit} className="form-horizontal">

            <Card>
              <CardHeader>
                <i className="fa fa-plus-square-o"></i> <strong>Crear Ruta</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="9">
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
                      <tr>
                        <td>Cooperativa:</td>
                        <td><Input type="select" name="select-coops" id="select" onChange={this.handleCoopRutaChange} required>
                          { this.state.cooperativas.map( coop => <option key={coop.id} value={coop.id}>{coop.nombre}</option>) }
                        </Input></td>
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
                        <Input type="select" name="select-bus" id="multiple-select" multiple onChange={this.handleBusesRutaChange} required>
                          { this.state.buses.map( bus => <option key={bus.id} value={bus.nobus}>{bus.nobus}</option>) }
                        </Input>
                      </CardBody>
                    </Card>

                    <Button type="submit" color="primary" block><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
