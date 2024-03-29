import React from 'react';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';
import {Link} from 'react-router-dom';

import AuthService from '../../services/AuthService';
import BadgeRole from "../utils/BadgeRole";
const auth = new AuthService();

export default class ViewUser extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/user/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const u = res.data;
        console.log(res.data);
        this.setState({user:u});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    let role = (this.state.user.role === undefined || this.state.user.role === null ) ? "-" : this.state.user.role;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div class="pull-right">
              <Link to={`/users/edit/${this.state.user.id}`}>
                <Button size="sm" color="success"><i className="cui-pencil"></i>&nbsp;Editar usuario</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col xs={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Usuario id: {this.state.user.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Table responsive striped>
                      <tbody>
                      <tr>
                        <td>Nombre:</td>
                        <td><strong>{ (this.state.user.name === "") ? "-" :  this.state.user.name}</strong></td>
                      </tr>
                      <tr>
                        <td>Apellidos:</td>
                        <td><strong>{ (this.state.user.lastName === "") ? "-" :  this.state.user.lastName}</strong></td>
                      </tr>
                      <tr>
                        <td>Username:</td>
                        <td><strong>{this.state.user.username}</strong></td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td><strong>{ (this.state.user.email === "") ? "-" :  this.state.user.email}</strong></td>
                      </tr>
                      <tr>
                        <td>Rol:</td>
                        <td><strong><BadgeRole role={role.name}/></strong></td>
                      </tr>
                      <tr>
                        <td>Creado:</td>
                        <td><strong>{this.state.user.createdAt}</strong></td>
                      </tr>
                      <tr>
                        <td>Modificado:</td>
                        <td><strong>{this.state.user.updatedAt}</strong></td>
                      </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
