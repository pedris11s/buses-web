import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
import BadgeRole from "../utils/BadgeRole";
const auth = new AuthService();

export default class ViewRole extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      role: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/role/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const r = res.data;
        this.setState({role:r});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){

    let users = (this.state.role.users === undefined ||
                this.state.role.users === null ||
                this.state.role.users.length === 0) ?
                <strong>No asignados.</strong>
                : this.state.role.users.map(user =>
                  <tr>
                    <td>{user.username}</td>
                    <td><Link to={`/users/view/${user.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link></td>
                  </tr>
                );

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div class="pull-right">
              <Link to={`/roles/edit/${this.state.role.id}`}>
                <Button size="sm" color="success"><i className="cui-pencil"></i>&nbsp;Editar rol</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col xs="9">
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Rol id: {this.state.role.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Table responsive striped>
                      <tbody>
                      <tr>
                        <td>Nombre:</td>
                        <td><strong><BadgeRole role={this.state.role.name}/></strong></td>
                      </tr>
                      <tr>
                        <td>Creada:</td>
                        <td><strong>{this.state.role.createdAt}</strong></td>
                      </tr>
                      <tr>
                        <td>Modificada:</td>
                        <td><strong>{this.state.role.updatedAt}</strong></td>
                      </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col xs="3">
            <Card>
              <CardHeader className="text-center">
                <i className="icon-people"></i> Usuarios
              </CardHeader>
              <CardBody className="text-center">
                <Table responsive hover>
                  <tbody>
                  {users}
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
