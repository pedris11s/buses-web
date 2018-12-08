import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from "react-router-dom";
import API from '../../services/api';

import AuthService from '../../services/AuthService';
import LikeButton from "../utils/LikeButton";
const auth = new AuthService();

export default class ListarCooperativas extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cooperativas: [],
    }

    this.deleteCoop = this.deleteCoop.bind(this);
  }

  componentDidMount(){
    API.get(`/cooperativa`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const coops = res.data;
        this.setState({cooperativas: coops});
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteCoop(id){
    API.delete(`/cooperativa/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = this.state.cooperativas.filter(r => r.id !== id);
        this.setState({cooperativas: arr});
      })
      .catch(err => {
        console(err);
      });
  }

  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-home"></i> <strong>Lista de Cooperativas</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Nombre</th>
                    <th>Pais</th>
                    <th>Provincia</th>
                    <th>Ciudad</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>

                      {
                        this.state.cooperativas.map((coop, index) =>
                          <tr key={index} className="text-center">
                            <td>{coop.nombre}</td>
                            <td>{coop.pais}</td>
                            <td>{coop.provincia}</td>
                            <td>{coop.ciudad}</td>
                            <td>
                              <LikeButton coopId={coop.id}/>
                              &nbsp;
                              <Link to={`/coops/view/${coop.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                              &nbsp;
                              <Link to={`/coops/edit/${coop.id}`}><Button size="sm" color="success"><i className="cui-pencil"></i></Button></Link>
                              &nbsp;
                              <Button onClick={ () => this.deleteCoop(coop.id) } size="sm" color="danger"><i className="cui-trash"></i></Button>
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
