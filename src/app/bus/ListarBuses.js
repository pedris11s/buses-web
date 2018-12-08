import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from "react-router-dom";
import API from '../../services/api';

import AuthService from '../../services/AuthService';
import LikeButton from "../utils/LikeButton";
const auth = new AuthService();

export default class ListarBuses extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      buses: [],
    }
    this.deleteBus = this.deleteBus.bind(this);
  }

  componentDidMount(){
    API.get(`/bus`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.setState({buses: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteBus(id){
    API.delete(`/bus/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = this.state.buses.filter(r => r.id !== id);
        this.setState({buses: arr});
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
                <i className="fa fa-bus"></i> <strong>Lista de Buses</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Placa</th>
                    <th>No. Bus</th>
                    <th>Frecuencia</th>
                    <th>Marca</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>

                  {
                    this.state.buses.map((bus, index) =>
                      <tr key={index} className="text-center">
                        <td>{bus.placa}</td>
                        <td>{bus.nobus}</td>
                        <td>{bus.frecuencia}</td>
                        <td>{bus.marca}</td>
                        <td>
                          <LikeButton id={bus.id} modelo={'bus'}/>
                            &nbsp;
                          <Link to={`/buses/view/${bus.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                            &nbsp;
                          <Link to={`/buses/edit/${bus.id}`}><Button size="sm" color="success"><i className="cui-pencil"></i></Button></Link>
                            &nbsp;
                          <Button onClick={ () => this.deleteBus(bus.id) } size="sm" color="danger"><i className="cui-trash"></i></Button>
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
