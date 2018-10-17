import React from 'react';
import axios from 'axios';
import {API_ROOT} from "../../config";
import { Badge, Modal, ModalFooter, ModalBody, ModalHeader, Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

export default class ListarCooperativas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cooperativas: []
    }
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/cooperativa`)
      .then(res => {
        const coops = res.data;
        this.setState({cooperativas: coops});
      });
  }

  deleteCoop(id){
    axios.delete(`${API_ROOT}/cooperativa/${id}`)
      .then(res => {
        const arr = this.state.cooperativas.filter(r => r.id !== id);
        this.setState({cooperativas: arr});
      })
      .catch(err => {
        //FIXME
        alert("soy un error" + err);
      });
  }

  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-industry"></i> <strong>Lista de Cooperativas</strong>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Pais</th>
                    <th>Provincia</th>
                    <th>Ciudad</th>
                    <th>Parroquia</th>
                    <th>Tipo</th>
                    <th>Modalidad</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>

                      {
                        this.state.cooperativas.map(coop =>
                          <tr>
                            <td>{coop.nombre}</td>
                            <td>{coop.pais}</td>
                            <td>{coop.provincia}</td>
                            <td>{coop.ciudad}</td>
                            <td>{coop.parroquia}</td>
                            <td>{coop.tipo}</td>
                            <td>{coop.modalidad}</td>
                            <td>
                              <Button onClick="" size="sm" color="success" outline>
                                <i className="fa fa-lightbulb-o"></i>
                              </Button>
                              &nbsp;
                              <Button size="sm" color="danger" outline onClick={ () => this.deleteCoop(coop.id) }>
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
