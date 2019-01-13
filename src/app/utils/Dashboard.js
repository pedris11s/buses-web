import React from 'react';
import Widget from "./Widget";
import {Row, Col, Progress, Table, CardBody, Card} from 'reactstrap';
import {Link} from "react-router-dom";
import API from "../../services/api";
import StarRating from 'react-star-rating-component';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cooperativas: [],
      buses: [],
      oficinas: [],
      rutas: []
    }
  }

  componentDidMount(){
    API.get(`/cooperativa`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = res.data.sort((a, b) => b.likes - a.likes);
        this.setState({cooperativas: arr});
      })
      .catch(err => {
        console.log(err);
      });

    API.get(`/bus`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = res.data.sort((a, b) => b.likes - a.likes);
        this.setState({buses: arr});
      })
      .catch(err => {
        console.log(err);
      });

    API.get(`/ruta`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = res.data;
        this.setState({rutas: arr});
      })
      .catch(err => {
        console.log(err);
      });

    API.get(`/oficina`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = res.data;
        this.setState({oficinas: arr});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return(
      <div>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Link to={'/oficinas'}>
              <Widget header={this.state.oficinas.length} mainText="Oficinas" icon="icon-briefcase" color="danger" variant="2" />
            </Link>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Link to={'/coops'}>
              <Widget header={this.state.cooperativas.length} mainText="Cooperativas" icon="icon-home" color="primary" variant="2" />
            </Link>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Link to={'/rutas'}>
              <Widget header={this.state.rutas.length} mainText="Rutas" icon="icon-cursor" color="warning" variant="2" />
            </Link>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Link to={'/buses'}>
              <Widget header={this.state.buses.length} mainText="Buses" icon="fa fa-bus" color="success" variant="2" />
            </Link>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="6" lg="6">
            <Card>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="icon-home"></i></th>
                    <th>Cooperativas</th>
                    <th className="text-center">Likes</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.cooperativas.map((coop, index) =>
                      <tr key={index}>
                        <td className="text-center">
                          <div className="avatar">
                            <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                            <span className="avatar-status badge-success"></span>
                          </div>
                        </td>
                        <td>
                          <div><Link to={`/coops/view/${coop.id}`}>{coop.nombre}</Link></div>
                          <div className="small text-muted">
                            <span>{coop.oficina.nombre}</span> | {coop.ciudad}
                          </div>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-star"></i><span> {coop.likes}</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="6">
            <Card>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="fa fa-bus"></i></th>
                    <th>Buses</th>
                    <th className="text-center">Likes</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.buses.map((bus, index) =>
                      <tr key={index}>
                        <td className="text-center">
                          <div className="avatar">
                            <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                            <span className="avatar-status badge-success"></span>
                          </div>
                        </td>
                        <td>
                          <div><Link to={`/buses/view/${bus.id}`}>{bus.nobus}</Link></div>
                          <div className="small text-muted">
                            <span>{bus.ruta.nombre}</span> | {bus.cooperativa.nombre}
                          </div>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-star"></i><span> {bus.likes}</span>
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
    )
  }

}

