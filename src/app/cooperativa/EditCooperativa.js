import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Label, FormGroup, Input, Row } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class EditCooperativa extends React.Component {
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
      oficina_coop: '',//select
      id: '',

      oficinas: [],
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handlePaisChange = this.handlePaisChange.bind(this);
    this.handleProvinciaChange = this.handleProvinciaChange.bind(this);
    this.handleCiudadChange = this.handleCiudadChange.bind(this);
    this.handleParroquiaChange = this.handleParroquiaChange.bind(this);
    this.handleModalidadChange = this.handleModalidadChange.bind(this);
    this.handleOficinaChange = this.handleOficinaChange.bind(this);
    this.handleTipoChange = this.handleTipoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    API.get(`/oficina`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const off = res.data;
        if(off.length > 0)
          this.setState(
            {
              oficinas: off,
              oficina_coop: off[0].id
            });
      })
      .catch(err => {
        console.log(err);
      });

    const id = this.props.match.params.id.toString();
    API.get(`/cooperativa/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const coop = res.data;
        this.setState({
          nombre: coop.nombre,
          pais: coop.pais,
          ciudad: coop.ciudad,
          provincia: coop.provincia,
          parroquia: coop.parroquia,
          tipo: coop.tipo,//radio -> string
          modalidad: coop.modalidad,//select
          id: coop.id
        })

        if(coop.oficina !== undefined && coop.oficina !== null)
          this.setState({oficina_coop: coop.oficina.id});
      })
      .catch(err => {
        console.log(err);
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
    }

    const id = this.state.id.toString();
    API.put(`/cooperativa/${id}`, cooperativa, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.props.history.replace(`/coops/view/${id}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    let modalidades = [
      'internacional', 'interprovincial', 'intercantonal', 'intraparroquial', 'urbanos'
    ]
    //console.log(this.state.oficina_coop);
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <Card>
                  <CardHeader>
                    <i className="icon-pencil"></i> <strong>Editar Cooperativa</strong>
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
                            <td><Input type="select" value={this.state.modalidad} onChange={ this.handleModalidadChange } required>
                              {modalidades.map(mod => (
                                <option key={mod} value={mod}>{mod}</option>
                              ))}
                            </Input>
                            </td>
                          </tr>
                          <tr>
                            <td>Oficina:</td>
                            <td><Input type="select" value={this.state.oficina_coop} onChange={this.handleOficinaChange} required>
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
                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" color="success" block><i className="icon-pencil"></i> Editar</Button>
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
