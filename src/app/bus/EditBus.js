import React from 'react';
import { Table, Form, Input, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class EditBus extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      placa: '',
      nobus: '',
      frecuencia: '',
      marca: '',
      condicion: '',
      coop_bus: '',
      ruta_bus: '',
      aux_ruta_bus: '',
      aux_coop_bus: '',
      id: '',

      cooperativas: [],
      rutas: [],
    }

    this.handleNoBusChange = this.handleNoBusChange.bind(this);
    this.handlePlacaChange = this.handlePlacaChange.bind(this);
    this.handleFrecuenciaChange = this.handleFrecuenciaChange.bind(this);
    this.handleMarcaChange = this.handleMarcaChange.bind(this);
    this.handleCondicionChange = this.handleCondicionChange.bind(this);
    this.handleCoopRutaChange = this.handleCoopRutaChange.bind(this);
    this.handleBusRutaChange = this.handleBusRutaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    API.get(`/cooperativa`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const coop = res.data;
        if(coop.length > 0)
          this.setState(
            {
              cooperativas: coop,
              aux_coop_bus: coop[0].id
            });
      })
      .then(() => {
        API.get(`/ruta`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
          .then(res => {
            const arr = res.data;
            if (arr.length > 0)
              this.setState(
                {
                  rutas: arr,
                  aux_ruta_bus: arr[0].id
                });
          })
          .then(() => {
            const id = this.props.match.params.id.toString();
            API.get(`/bus/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
              .then(res => {
                const bus = res.data;
                //console.log(bus);
                this.setState({
                  placa: bus.placa,
                  nobus: bus.nobus,
                  frecuencia: bus.frecuencia,
                  marca: bus.marca,
                  condicion: bus.condicion,
                  id: bus.id
                });
                let cooperativa = (bus.cooperativa === undefined || bus.cooperativa === null || bus.cooperativa.length === 0) ? "Desconocida" : bus.cooperativa;
                if(cooperativa.id === undefined)
                  this.setState({coop_bus: this.state.aux_coop_bus});
                else
                  this.setState({coop_bus: cooperativa.id});

                let ruta = (bus.ruta === undefined || bus.ruta === null || bus.ruta.length === 0) ? "Desconocida" : bus.ruta;
                if(ruta.id === undefined)
                  this.setState({ruta_bus: this.state.aux_ruta_bus});
                else
                  this.setState({ruta_bus: ruta.id});

                console.log(bus.ruta, this.state.ruta_bus, this.state.aux_ruta_bus);
              })
          });
      })
      .catch(err => {
        console.log(err);
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

  handleBusRutaChange = event => {
    this.setState({ ruta_bus: event.target.value, });
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
    };
    const id = this.state.id.toString();
    API.put(`/bus/${id}`, bus, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.props.history.push(`/buses/view/${id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
      <div>

        <div className="animated fadeIn">

          <Row>
            <Col xs={9}>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">

                <Card>
                  <CardHeader>
                    <i className="cui-pencil"></i> <strong>Editar Bus</strong>
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
                            <td><Input type="select" value={this.state.coop_bus} name="select-coops" id="select" onChange={this.handleCoopRutaChange} required>
                              { this.state.cooperativas.map( coop => <option key={coop.id} value={coop.id}>{coop.nombre}</option>) }
                            </Input></td>
                          </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" color="success" block><i className="cui-pencil"></i> Editar</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>
            <Col xs="3">

              <Card>
                <CardHeader className="text-center">
                  <i className="icon-cursor"></i> Ruta
                </CardHeader>
                <CardBody className="text-center">
                  <Input type="select" value={this.state.ruta_bus} onChange={this.handleBusRutaChange}  required>
                    { this.state.rutas.map( b => <option key={b.id} value={b.id}>{b.nombre}</option>) }
                  </Input>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
