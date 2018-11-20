import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Label, FormGroup, Input, Row } from 'reactstrap';
import API from '../../services/api';

export default class AddCooperativa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      pais: '',
      ciudad: '',
      provincia: '',
      parroquia: '',
      tipo: 'Publica',//radio -> string
      modalidad: 'internacional',//select
      rutas_coop: [],//muliple select
      buses_coop: [],//multiple select
      oficina_coop: '',//select

      oficinas: [],
      rutas: [],
      buses: []
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handlePaisChange = this.handlePaisChange.bind(this);
    this.handleProvinciaChange = this.handleProvinciaChange.bind(this);
    this.handleCiudadChange = this.handleCiudadChange.bind(this);
    this.handleParroquiaChange = this.handleParroquiaChange.bind(this);
    this.handleModalidadChange = this.handleModalidadChange.bind(this);
    this.handleOficinaChange = this.handleOficinaChange.bind(this);
    this.handleTipoChange = this.handleTipoChange.bind(this);
    this.handleBusesChange = this.handleBusesChange.bind(this);
    this.handleRutasChange = this.handleRutasChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    /*API.get(`/ruta`)
      .then(res => {
        const r = res.data;
        if(r.length > 0)
          this.setState(
            {
              rutas: r
            });
      });

    API.get(`/bus`)
      .then(res => {
        const buses = res.data;
        if(buses.length > 0)
          this.setState(
            {
              buses: buses,
            });
      });*/

    API.get(`/oficina`)
      .then(res => {
        const off = res.data;
        if(off.length > 0)
          this.setState(
            {
              oficinas: off,
              oficina_coop: off[0].id
            });
      });
  }

  handleNombreChange = event => {
    this.setState({ nombre: event.target.value, });
  }

  handlePaisChange = event => {
    this.setState({ pais: event.target.value, });
  }

  handleProvinciaChange = event => {
    this.setState({ provincia: event.target.value, });
  }

  handleCiudadChange = event => {
    this.setState({ ciudad: event.target.value, });
  }

  handleParroquiaChange = event => {
    this.setState({ parroquia: event.target.value, });
  }

  handleModalidadChange = event => {
    this.setState({ modalidad: event.target.value, });
  }

  handleOficinaChange = event => {
    this.setState({ oficina_coop: event.target.value, });
  }

  handleTipoChange = event => {
    console.log(event.target.value);
    this.setState({tipo: event.target.value});
  }

  handleBusesChange = event => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({buses_coop: value});
  }

  handleRutasChange = event => {
    let options = event.target.options;
    let value = [];
    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({rutas_coop: value});
  }

  handleSubmit = event => {
    event.preventDefault();

    const cooperativa = {
      nombre: this.state.nombre,
      pais: this.state.pais,
      provincia: this.state.provincia,
      ciudad: this.state.ciudad,
      parroquia: this.state.parroquia,
      tipo: this.state.tipo,
      modalidad: this.state.modalidad,
      oficina: this.state.oficina_coop,
      //rutas: this.state.rutas_coop,
      //buses: this.state.buses_coop
    }

    console.log(cooperativa);

    API.post(`/cooperativa/`, cooperativa)
      .then(res => {
        //console.log(res.data);
        this.setState({
          nombre: '',
          pais: '',
          provincia: '',
          ciudad: '',
          parroquia: '',
          tipo: 'Publica',
          modalidad: 'internacional'
        })
        this.props.history.push('/coops/view');
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    let modalidades = [
      'internacional', 'interprovincial', 'intercantonal', 'intraparroquial', 'urbanos'
    ]

    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <Card>
                  <CardHeader>
                    <i className="fa fa-plus-square-o"></i> <strong>Crear Cooperativa</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Nombre:</td>
                            <td><Input type="text" value={this.state.nombre} onChange={this.handleNombreChange}
                                       required/></td>
                          </tr>
                          <tr>
                            <td>Pais:</td>
                            <td><Input type="text" value={this.state.pais} onChange={this.handlePaisChange}
                                       required/></td>
                          </tr>
                          <tr>
                            <td>Provincia:</td>
                            <td><Input type="text" value={this.state.provincia} onChange={this.handleProvinciaChange}
                                       required/></td>
                          </tr>
                          <tr>
                            <td>Ciudad:</td>
                            <td><Input type="text" value={this.state.ciudad} onChange={this.handleCiudadChange}
                                       required/></td>
                          </tr>
                          </tbody>
                        </Table>
                      </Col>

                      <Col xs="6">

                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Parroquia:</td>
                            <td><Input type="text" value={this.state.parroquia} onChange={this.handleParroquiaChange}
                                       required/></td>
                          </tr>
                          <tr>
                            <td>Modalidad:</td>
                            <td><Input type="select" onChange={ this.handleModalidadChange } required>
                              {modalidades.map(mod => (
                                <option key={mod} value={mod}>{mod}</option>
                              ))}
                            </Input>
                            </td>
                          </tr>
                          <tr>
                            <td>Oficina:</td>
                            <td><Input type="select" onChange={this.handleOficinaChange} required>
                              { this.state.oficinas.map( off => <option key={off.id} value={off.id}>{off.nombre}</option>) }
                            </Input></td>
                          </tr>
                          <tr>
                            <td>Tipo:</td>
                            <td>
                              <Col md="9">
                                <FormGroup check inline>
                                  <Input className="form-check-input" onChange={this.handleTipoChange} type="radio" value='Publica' checked={this.state.tipo === 'Publica'}  />
                                  <Label className="form-check-label" check htmlFor="inline-radio1">Publica</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                  <Input className="form-check-input" onChange={this.handleTipoChange} type="radio" value='Privada' checked={this.state.tipo === 'Privada'}  />
                                  <Label className="form-check-label" check htmlFor="inline-radio2">Privada</Label>
                                </FormGroup>
                              </Col>
                            </td>
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

/*
<FormGroup>
  <Label htmlFor="postal-code">Tipo</Label>
  <FormGroup row>
    <Col md="9">
      <FormGroup check inline>
        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
        <Label className="form-check-label" check htmlFor="inline-radio1">Publica</Label>
      </FormGroup>
      <FormGroup check inline>
        <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
        <Label className="form-check-label" check htmlFor="inline-radio2">Privada</Label>
      </FormGroup>
    </Col>
  </FormGroup>
*/
