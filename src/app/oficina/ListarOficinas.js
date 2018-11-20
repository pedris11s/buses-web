import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Redirect} from "react-router-dom";
import API from '../../services/api';

export default class ListarOficinas extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      oficinas: [],
      viewRedirect: false
    }

    this.deleteOficina = this.deleteOficina.bind(this);
    this.viewOficina = this.viewOficina.bind(this);
  }

  componentDidMount(){
    API.get('/oficina')
      .then(res => {
        const arr = res.data;
        this.setState({oficinas: arr});
      })
      .catch(err => {
        //FIXME
        alert("soy un error" + err);
      });
    /*axios.get(`${API_ROOT}/oficina`)
      .then(res => {
        const arr = res.data;
        this.setState({oficinas: arr});
      })*/
  }

  setViewRedirect = () => {
    this.setState({viewRedirect: true});
  }

  viewOficina = (id) => {
    //console.log("ENTRE AQUI!!!!");
    const link = `/oficinas/view/${id}`;
    if(this.state.viewRedirect)
      return <Redirect to={link}/>
  }

  deleteOficina(id){
    API.delete(`/oficina/${id}`)
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
                      this.state.oficinas.map( (oficina, index) => (
                        <tr>
                          <td>{oficina.nombre}</td>
                          <td>{oficina.ciudad}</td>
                          <td>{oficina.direccion}</td>
                          <td>{oficina.telefono}</td>
                          <td>
                            {this.viewOficina(oficina.id)}
                            <Button onClick={ this.setViewRedirect } size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
                            &nbsp;
                            <Button onClick={() => this.deleteOficina(oficina.id)} size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
                          </td>
                        </tr>
                      ))}
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
