import React from 'react';
import axios from "axios";
import {API_ROOT} from "../../config";
import { Table, Form, Input, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

export default class AddBus extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      placa: '',
      nobus: '',
      frecuencia: '',
      marca: '',
      condicion: '',
      coop_bus: '',
      rutas_bus: [],

      cooperativas: [],
      rutas: []
    }

    this.handleNoBusChange = this.handleNoBusChange.bind(this);
    this.handlePlacaChange = this.handlePlacaChange.bind(this);
    this.handleFrecuenciaChange = this.handleFrecuenciaChange.bind(this);
    this.handleMarcaChange = this.handleMarcaChange.bind(this);
    this.handleCondicionChange = this.handleCondicionChange.bind(this);
    this.handleCoopRutaChange = this.handleCoopRutaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/cooperativa`)
      .then(res => {
        const coop = res.data;
        if(coop.length > 0)
          this.setState(
            {
              cooperativas: coop,
              coop_bus: coop[0].id
            });
      });

    axios.get(`${API_ROOT}/ruta`)
      .then(res => {
        const r = res.data;
        if(r.length > 0)
          this.setState(
            {
              rutas: r
            });
      });
  }

  handleNoBusChange = event => {
    this.setState({ nobus: event.target.value, });
  }

  handlePlacaChange = event => {
    this.setState({ placa: event.target.value, });
  }
  handleFrecuenciaChange = event => {
    this.setState({ frecuencia: event.target.value, });
  }
  handleCondicionChange = event => {
    this.setState({ condicion: event.target.value, });
  }
  handleMarcaChange = event => {
    this.setState({ marca: event.target.value, });
  }
  handleCoopRutaChange = event => {
    this.setState({ coop_bus: event.target.value, });
  }

  handleSubmit = event => {
    event.preventDefault();
    const bus = {
      placa: this.state.placa,
      nobus: this.state.nobus,
      frecuencia: this.state.frecuencia,
      marca: this.state.marca,
      condicion: this.state.condicion,
      cooperativa: this.state.coop_bus,
      //rutas: this.state.rutas_bus
    };
    //console.log(bus);
    axios.post(`${API_ROOT}/bus/`, bus)
      .then(res => {
        //this.props.addRuta(ruta);
        //console.log(this.state.buses_ruta);
        this.setState({
          placa: '',
          nobus: '',
          frecuencia: '',
          marca: '',
          condicion: '',
        });

        //console.log(res.data);
        this.props.history.push('/buses/view');
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
                    <i className="fa fa-plus-square-o"></i> <strong>Crear Bus</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Placa:</td>
                            <td><Input type="text" value={this.state.placa} onChange={this.handlePlacaChange} required/></td>
                          </tr>
                          <tr>
                            <td>No. Bus:</td>
                            <td><Input type="text" value={this.state.nobus} onChange={this.handleNoBusChange} required/></td>
                          </tr>
                          <tr>
                            <td>Frecuencia:</td>
                            <td><Input type="text" value={this.state.frecuencia} onChange={this.handleFrecuenciaChange} required/></td>
                          </tr>
                          </tbody>
                        </Table>
                      </Col>

                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Marca:</td>
                            <td><Input type="text" value={this.state.marca} onChange={this.handleMarcaChange} required/></td>
                          </tr>
                          <tr>
                            <td>Condicion:</td>
                            <td><Input type="text"  value={this.state.condicion} onChange={this.handleCondicionChange} required/></td>
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
                      <Button type="submit" color="primary" block><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
