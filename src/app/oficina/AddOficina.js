import React from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import {API_ROOT} from "../../config";


export default class AddOficina extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      ciudad: '',
      direccion: '',
      telefono: '',
      facebook: '',
      whatsapp: ''
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleCiudadChange = this.handleCiudadChange.bind(this);
    this.handleDireccionChange = this.handleDireccionChange.bind(this);
    this.handleTelefonoChange = this.handleTelefonoChange.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleWhatsappChange = this.handleWhatsappChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNombreChange = event => {
    console.log(this.state.nombre);
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

  handleSubmit = event => {
    event.preventDefault();

    const oficina = {
      nombre: this.state.nombre,
      ciudad: this.state.ciudad,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      facebook: this.state.facebook,
      whatsapp: this.state.whatsapp
    }

    axios.post(`${API_ROOT}/oficina/`, oficina)
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
      })
      .catch(err => {
        console.log(err);
      })
  }


  render(){
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-plus-square-o"></i> <strong>Crear Oficina</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" className="form-horizontal">

                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="city">Nombre</Label>
                        <Input type="text" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleNombreChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="postal-code">Ciudad</Label>
                        <Input type="text" id="postal-code" placeholder="Ciudad" value={this.state.ciudad} onChange={this.handleCiudadChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="postal-code">Direccion</Label>
                        <Input type="text" id="postal-code" placeholder="Direccion"  value={this.state.direccion} onChange={this.handleDireccionChange}required/>
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="city">Telefono</Label>
                        <Input type="text" name="nombre" placeholder="Telefono" value={this.state.telefono} onChange={this.handleTelefonoChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="postal-code">Facebook</Label>
                        <Input type="text" id="postal-code" placeholder="Facebook" value={this.state.facebook} onChange={this.handleFacebookChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="city">Whatsapp</Label>
                        <Input type="text" name="nombre" placeholder="Whatsapp" value={this.state.whatsapp} onChange={this.handleWhatsappChange} required/>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col>
                      <div className="btn btn-group pull-right">
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
    )
  }
}
