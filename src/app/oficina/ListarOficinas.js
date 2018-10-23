import React from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {API_ROOT} from "../../config";

const OficinaRow = props => {
  const oficina = props.oficina;
  const oficinaLink = `#/oficinas/view/${oficina.id}`;

  return (
    <tr>
      <td>{oficina.nombre}</td>
      <td>{oficina.ciudad}</td>
      <td>{oficina.direccion}</td>
      <td>{oficina.telefono}</td>
      <td>
        <a href={oficinaLink}>
          <Button size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
        </a>
        &nbsp;
        <a>
          <Button size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
        </a>
      </td>
    </tr>
  );
}


export default class ListarOficinas extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      oficinas: []
    }

    this.deleteOficina = this.deleteOficina.bind(this);
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/oficina`)
      .then(res => {
        const arr = res.data;
        this.setState({oficinas: arr});
      })
  }

  deleteOficina(id){
    axios.delete(`${API_ROOT}/oficina/${id}`)
      .then(res => {
        const arr = this.state.oficinas.filter(r => r.id !== id);
        this.setState({oficinas: arr});
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
                <i className="icon-briefcase"></i> <strong>Lista de Oficinas</strong>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Ciudad</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.oficinas.map( (oficina, index) =>
                      <OficinaRow key={index} oficina={oficina} />
                    )}
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
