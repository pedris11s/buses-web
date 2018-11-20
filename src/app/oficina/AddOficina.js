import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Input, Row } from 'reactstrap';
import API from '../../services/api';

export default class AddOficina extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      ciudad: '',
      direccion: '',
      telefono: '',
      facebook: '',
      whatsapp: '',
      coop_off: '',
      cooperativas: []
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleCiudadChange = this.handleCiudadChange.bind(this);
    this.handleDireccionChange = this.handleDireccionChange.bind(this);
    this.handleTelefonoChange = this.handleTelefonoChange.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleWhatsappChange = this.handleWhatsappChange.bind(this);
    this.handleCoopChange = this.handleCoopChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    API.get(`/cooperativa`)
      .then(res => {
        const coops = res.data;
        if(coops.length > 0)
          this.setState(
            {
              cooperativas: coops,
              coop_off: coops[0].id
            });
      });
  }

  handleNombreChange = event => {
    this.setState({ nombre: event.target.value, });
  }

  handleCiudadChange = event => {
    this.setState({ ciudad: event.target.value, });
  }

  handleDireccionChange = event => {
    this.setState({ direccion: event.target.value, });
  }

  handleTelefonoChange = event => {
    this.setState({ telefono: event.target.value, });
  }

  handleFacebookChange = event => {
    this.setState({ facebook: event.target.value, });
  }

  handleWhatsappChange = event => {
    this.setState({ whatsapp: event.target.value, });
  }

  handleCoopChange = event => {
    this.setState({ coop_ruta: event.target.value, });
  }

  handleSubmit = event => {
    event.preventDefault();

    const oficina = {
      nombre: this.state.nombre,
      ciudad: this.state.ciudad,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      facebook: this.state.facebook,
      whatsapp: this.state.whatsapp,
      //cooperativa: this.state.coop_off
    }

    API.post(`/oficina/`, oficina)
      .then(res => {
        //console.log(res.data);
        this.setState({
          nombre: '',
          ciudad: '',
          direccion: '',
          telefono: '',
          facebook: '',
          whatsapp: ''
        })
        this.props.history.push('/oficinas/view');
      })
      .catch(err => {
        console.log(err);
      })
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
                    <i className="fa fa-plus-square-o"></i> <strong>Crear Oficina</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Nombre:</td>
                            <td><Input type="text" value={this.state.nombre} onChange={this.handleNombreChange} required/></td>
                          </tr>
                          <tr>
                            <td>Ciudad:</td>
                            <td><Input type="text" value={this.state.ciudad} onChange={this.handleCiudadChange} required/></td>
                          </tr>
                          <tr>
                            <td>Direccion:</td>
                            <td><Input type="text" value={this.state.direccion} onChange={this.handleDireccionChange} required/></td>
                          </tr>
                          </tbody>
                        </Table>
                      </Col>

                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Telefono:</td>
                            <td><Input type="text" value={this.state.telefono} onChange={this.handleTelefonoChange} required/></td>
                          </tr>
                          <tr>
                            <td>Facebook:</td>
                            <td><Input type="text"  value={this.state.facebook} onChange={this.handleFacebookChange} required/></td>
                          </tr>
                          <tr>
                            <td>Whatsapp:</td>
                            <td><Input type="text"  value={this.state.whatsapp} onChange={this.handleWhatsappChange} required/></td>
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
