import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class ListarRutas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rutas: [],
    }

    this.deleteRuta = this.deleteRuta.bind(this);
  }

  componentDidMount(){
    API.get(`/ruta`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.setState({ rutas: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteRuta = (id) => {
    API.delete(`/ruta/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = this.state.rutas.filter(r => r.id !== id);
        this.setState({rutas: arr});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-cursor"></i> <strong>Lista de Rutas</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Nombre</th>
                    <th>Coo. Origen</th>
                    <th>Coo. Destino</th>
                    <th>Ciudad Origen</th>
                    <th>Ciudad Destino</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.rutas.map( (ruta, index) =>
                    <tr key={index} className="text-center">
                      <td>{ruta.nombre}</td>
                      <td>{ruta.coo_origen}</td>
                      <td>{ruta.coo_destino}</td>
                      <td>{ruta.ciudad_origen}</td>
                      <td>{ruta.ciudad_destino}</td>
                      <td>
                        <Link to={`/rutas/view/${ruta.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                        &nbsp;
                        <Link to={`/rutas/edit/${ruta.id}`}><Button size="sm" color="success"><i className="cui-pencil"></i></Button></Link>
                        &nbsp;
                        <Button onClick={() => this.deleteRuta(ruta.id)} size="sm" color="danger"><i className="cui-trash"></i></Button>
                      </td>
                    </tr>
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
