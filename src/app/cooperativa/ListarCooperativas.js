import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Redirect} from "react-router-dom";
import API from '../../services/api';

export default class ListarCooperativas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cooperativas: [],
      viewRedirect: false
    }

    this.setViewRedirect = this.setViewRedirect.bind(this);
    this.deleteCoop = this.deleteCoop.bind(this);
  }

  componentDidMount(){
    API.get(`/cooperativa`)
      .then(res => {
        const coops = res.data;
        this.setState({cooperativas: coops});
      });
  }

  deleteCoop(id){
    API.delete(`/cooperativa/${id}`)
      .then(res => {
        const arr = this.state.cooperativas.filter(r => r.id !== id);
        this.setState({cooperativas: arr});
      })
      .catch(err => {
        //FIXME
        alert("soy un error" + err);
      });
  }

  setViewRedirect = () => {
    this.setState({viewRedirect: true});
  }

  viewCoop = (id) => {
    //console.log("ENTRE AQUI!!!!");
    const link = `/coops/view/${id}`;
    if(this.state.viewRedirect)
      return <Redirect to={link}/>
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
                            <td>
                              {this.viewCoop(coop.id)}
                              <Button onClick={this.setViewRedirect} size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
                              &nbsp;
                              <Button onClick={ () => this.deleteCoop(coop.id) } size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
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
