import React from 'react';
import axios from 'axios';
import {API_ROOT} from "../../config";

import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

export default class ListarRutas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rutas: []
    }

    this.deleteRuta = this.deleteRuta.bind(this);
  }

  deleteRuta(id){
    axios.delete(`${API_ROOT}/ruta/${id}`)
      .then(res => {
        const arr = this.state.rutas.filter(r => r.id !== id);
        this.setState({rutas: arr});
        console.log(this.state.rutas);
      })
      .catch(err => {
        //FIXME
        alert(err);
      });
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/ruta`)
      .then(res => {
        console.log(res.data);
        const rutas = res.data;
        this.setState({ rutas });
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
                  { this.state.rutas.map( (ruta, index) =>
                      <tr key={index}>
                        <td>{ruta.nombre}</td>
                        <td>{ruta.coo_origen}</td>
                        <td>{ruta.coo_destino}</td>
                        <td>{ruta.ciudad_origen}</td>
                        <td>{ruta.ciudad_destino}</td>
                        <td>{ruta.cooperativa.nombre}</td>
                        <td>
                            <Button size="sm" color="success" outline>
                              <i className="fa fa-lightbulb-o"></i>
                            </Button>
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
