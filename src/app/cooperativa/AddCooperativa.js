import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default class AddCooperativa extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      pais: '',
      ciudad: '',
      provincia: '',
      parroquia: '',
      tipo: '',//radio
      modalidad: '',//select
      rutas: [],//muliple select
      buses: [],//multiple select
      oficina: ''//select
    }
  }

  render(){
    return(
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>Basic Form</strong> Elements
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="city">Nombre</Label>
                        <Input type="text" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleNombreChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="postal-code">Pais</Label>
                        <Input type="text" id="postal-code" placeholder="Ciudad Origen" required/>
                      </FormGroup>
                     </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="postal-code">Ciudad</Label>
                        <Input type="text" id="postal-code" placeholder="Ciudad Destino"  required/>
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row className="my-0">
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="city">Provincia</Label>
                        <Input type="text" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleNombreChange} required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="postal-code">Parroquia</Label>
                        <Input type="text" id="postal-code" placeholder="Ciudad Origen" required/>
                      </FormGroup>
                    </Col>
                    <Col xs="4">
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
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="multiple-select">Rutas</Label>
                        <Input type="select"  name="select-bus" id="multiple-select" multiple  required>
                          <option >opcion</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="multiple-select">Buses</Label>
                        <Input type="select"  name="select-bus" id="multiple-select" multiple  required>
                          <option >opcion</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="select">Modalidad</Label>
                        <Input type="select"  name="select-coops" id="select"  required>
                          <option>hola</option>
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col xs="3">
                      <FormGroup>
                        <Label htmlFor="select">Oficina</Label>
                        <Input type="select"  name="select-coops" id="select"  required>
                          <option>hola</option>
                        </Input>
                      </FormGroup>
                    </Col>



                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }


}
