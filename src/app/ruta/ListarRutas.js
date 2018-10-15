import React from 'react';
import axios from 'axios';
import {API_ROOT} from "../../config";

import { Badge, Modal, ModalFooter, ModalBody, ModalHeader, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

export default class ListarRutas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rutas: [],
      viewModal: false
    }

    this.deleteRuta = this.deleteRuta.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      viewModal: !this.state.viewModal,
    });
  }

  deleteRuta(id){
    axios.delete(`${API_ROOT}/ruta/${id}`)
      .then(res => {
        const arr = this.state.rutas.filter(r => r.id !== id);
        this.setState({rutas: arr});
        //console.log(this.state.rutas);
      })
      .catch(err => {
        //FIXME
        alert("soy un error" + err);
      });
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/ruta`)
      .then(res => {
        //console.log(res.data);
        const rutas = res.data;
        this.setState({ rutas });
        this.props.setRutas(rutas);
      });
  }

  render(){
    return (
      <div class="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-cursor"></i> <strong>Lista de Rutas</strong>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Coo. Origen</th>
                    <th>Coo. Destino</th>
                    <th>Ciudad Origen</th>
                    <th>Ciudad Destino</th>
                    <th>Cooperativa</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.props.rutas.rutas.map( (ruta, index) =>
                      <tr key={index}>
                        <td>{ruta.nombre}</td>
                        <td>{ruta.coo_origen}</td>
                        <td>{ruta.coo_destino}</td>
                        <td>{ruta.ciudad_origen}</td>
                        <td>{ruta.ciudad_destino}</td>
                        <td>{ruta.cooperativa.nombre}</td>
                        <td>
                            {/*TODO poner en un componente viewRuta*/}
                            <Button onClick={this.toggle} size="sm" color="success" outline>
                              <i className="fa fa-lightbulb-o"></i>
                            </Button>
                            <Modal isOpen={this.state.viewModal} toggle={this.toggle} className={this.props.className}>
                              <ModalHeader toggle={this.toggle}> <i className="icon-cursor"></i>  Ver ruta</ModalHeader>
                              <ModalBody>
                                <Table responsive striped hover>
                                  <tbody>

                                        <tr>
                                          <td>Nombre:</td>
                                          <td><strong>{ruta.nombre}</strong></td>
                                        </tr>
                                        <tr>
                                          <td>Coo. Origen:</td>
                                          <td><strong>{ruta.coo_origen}</strong></td>
                                        </tr>
                                        <tr>
                                          <td>Coo. Destino:</td>
                                          <td><strong>{ruta.coo_destino}</strong></td>
                                        </tr>
                                        <tr>
                                          <td>Ciudad Origen:</td>
                                          <td><strong>{ruta.ciudad_origen}</strong></td>
                                        </tr>
                                        <tr>
                                          <td>Ciudad Destino:</td>
                                          <td><strong>{ruta.ciudad_destino}</strong></td>
                                        </tr>
                                        <tr>
                                          <td>Cooperativa:</td>
                                          <td><strong>{ruta.cooperativa.nombre}</strong></td>
                                        </tr>
                                  </tbody>
                                </Table>
                                {/*TODO mostrar buses de la ruta*/}
                                <Row>
                                  <Col xs="12" lg="12">
                                    <Card>
                                      <CardHeader className="text-center">
                                        <i className="fa fa-bus"></i> Buses
                                      </CardHeader>
                                      <CardBody>
                                        <Table responsive>
                                          <tbody>
                                          <tr className="text-lg-center">
                                            <td>A&P-2210</td>
                                            <td>
                                              <Badge color="success">Active</Badge>
                                            </td>
                                          </tr>
                                          <tr className="text-lg-center">
                                            <td>B&A-1605</td>
                                            <td>
                                              <Badge color="danger">Love</Badge>
                                            </td>
                                          </tr>
                                          </tbody>
                                        </Table>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </ModalBody>
                            </Modal>
                            &nbsp;
                            <Button size="sm" color="danger" outline onClick={ () => this.deleteRuta(ruta.id) }>
                                <i className="fa fa-trash"></i>
                            </Button>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </Table>


                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
