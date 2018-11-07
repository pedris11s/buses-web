import React from 'react';
import axios from 'axios';
import {API_ROOT} from "../../config";
import { Redirect } from 'react-router-dom';

import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const RutaRow = props => {
  const ruta = props.ruta;
  const rutaLink = `#/rutas/view/${ruta.id}`;

  return (
    <tr>
      <td>{ruta.nombre}</td>
      <td>{ruta.coo_origen}</td>
      <td>{ruta.coo_destino}</td>
      <td>{ruta.ciudad_origen}</td>
      <td>{ruta.ciudad_destino}</td>
      <td>
        <a href={rutaLink}>
          <Button size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
        </a>
        &nbsp;
        <a>
          {/*onClick={() => this.props.deleteRuta(ruta.id)}*/}
          <Button onClick={ () => this.props.deleteRuta(ruta.id) } size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
        </a>
      </td>
    </tr>
  );
}

export default class ListarRutas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rutas: [],
      viewRedirect: false,
      viewModal: false
    }

    this.deleteRuta = this.deleteRuta.bind(this);
    this.viewRuta = this.viewRuta.bind(this);
  }

  deleteRuta = (id) => {
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

  setViewRedirect = () => {
    this.setState({viewRedirect: true});
  }

  viewRuta = (id) => {
    //console.log("ENTRE AQUI!!!!");
    const link = `/rutas/view/${id}`;
    if(this.state.viewRedirect)
      return <Redirect to={link}/>
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/ruta`)
      .then(res => {
        //console.log(res.data);
        const rutas = res.data;
        this.setState({ rutas });
        //this.props.setRutas(rutas);
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
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.rutas.map( (ruta, index) =>
                    <tr>
                      <td>{ruta.nombre}</td>
                      <td>{ruta.coo_origen}</td>
                      <td>{ruta.coo_destino}</td>
                      <td>{ruta.ciudad_origen}</td>
                      <td>{ruta.ciudad_destino}</td>
                      <td>
                          {this.viewRuta(ruta.id)}
                          <Button onClick={ this.setViewRedirect } size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
                        &nbsp;
                        <a>
                          <Button onClick={ () => this.deleteRuta(ruta.id) } size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
                        </a>
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
