import React from 'react';
import axios from 'axios';

import { Form, Input, Label, FormGroup, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
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
    //this.setState({ coop_ruta: event.target.value, });
    let options = event.target.options;
    //console.log(options);
    let value = [];
    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({buses_ruta: value});
    //console.log(value);
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
        this.props.addRuta(ruta);
        this.setState({
          nombre: '',
          coo_origen: '',
          coo_destino: '',
          ciudad_destino: '',
          ciudad_origen: '',
          coop_ruta: [],
          buses_ruta: []
        });
        console.log(this.props.rutas);
      });


  }

  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-plus-square-o"></i> <strong>Crear Ruta</strong>
              </CardHeader>
              <CardBody>

                <Form onSubmit={this.handleSubmit} className="form-horizontal">
                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="city">Nombre</Label>
                        <Input type="text" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleNombreChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label htmlFor="postal-code">Coo.Origen</Label>
                        <Input type="text" id="postal-code" placeholder="Coo.Origen" value={this.state.coo_origen} onChange={this.handleCooOrigenChange} required/>
                      </FormGroup>
                    </Col>

                    <Col xs="2">
                      <FormGroup>
                        <Label htmlFor="postal-code">Coo.Destino</Label>
                        <Input type="text" id="postal-code" placeholder="Coo.Destino" value={this.state.coo_destino} onChange={this.handleCooDestinoChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label htmlFor="postal-code">Ciudad Origen</Label>
                        <Input type="text" id="postal-code" placeholder="Ciudad Origen" value={this.state.ciudad_origen} onChange={this.handleCiudadOrigenChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="2">
                      <FormGroup>
                        <Label htmlFor="postal-code">Ciudad Destino</Label>
                        <Input type="text" id="postal-code" placeholder="Ciudad Destino" value={this.state.ciudad_destino} onChange={this.handleCiudadDestinoChange} required/>
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="multiple-select">Buses</Label>
                        <Input type="select" value={this.state.buses_ruta} name="select-bus" id="multiple-select" multiple onChange={this.handleBusesRutaChange} required>
                          { this.state.buses.map( bus => <option key={bus.id} value={bus.id}>{bus.nobus}</option>) }
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col xs="6">
                      <FormGroup>
                        <Label htmlFor="select">Cooperativa</Label>
                        <Input type="select" value={this.state.coop_ruta} name="select-coops" id="select" onChange={this.handleCoopRutaChange} required>
                          { this.state.cooperativas.map( coop => <option key={coop.id} value={coop.id}>{coop.nombre}</option>) }
                        </Input>
                      </FormGroup>
                      <div className="btn btn-group">
                        <Button type="submit" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        <Button type="reset" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                      </div>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
