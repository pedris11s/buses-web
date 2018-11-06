import React from 'react';
import axios from 'axios';
import {API_ROOT} from "../../config";

import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Redirect} from "react-router-dom";

export default class ListarBuses extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      buses: [],
      viewRedirect: false
    }
    this.deleteBus = this.deleteBus.bind(this);
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/bus`)
      .then(res => {
        const b = res.data;
        this.setState({buses: b});
      })
  }

  setViewRedirect = () => {
    this.setState({viewRedirect: true})
  }

  viewBus = (id) => {
    //console.log("ENTRE AQUI!!!!");
    const link = `/buses/view/${id}`;
    if(this.state.viewRedirect)
      return <Redirect to={link}/>
  }

  deleteBus(id){
    axios.delete(`${API_ROOT}/bus/${id}`)
      .then(res => {
        const arr = this.state.buses.filter(r => r.id !== id);
        this.setState({buses: arr});
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
                <i className="fa fa-bus"></i> <strong>Lista de Buses</strong>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Placa</th>
                    <th>No. Bus</th>
                    <th>Frecuencia</th>
                    <th>Marca</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>

                  {
                    this.state.buses.map(bus =>
                      <tr>
                        <td>{bus.placa}</td>
                        <td>{bus.nobus}</td>
                        <td>{bus.frecuencia}</td>
                        <td>{bus.marca}</td>
                        <td>
                          {this.viewBus(bus.id)}
                          <Button onClick={this.setViewRedirect} size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
                          &nbsp;
                          <Button onClick={ () => this.deleteBus(bus.id) } size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
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
