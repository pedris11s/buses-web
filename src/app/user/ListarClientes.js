import React from 'react';
import {Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
import BadgeRole from "../BadgeRole";
const auth = new AuthService();

export default class ListarClientes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount(){
    API.get(`/user/list`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const u = res.data.users;
        const arr = u.filter(r => r.role.name !== 'root' && r.role.name !== 'admin');
        this.setState({ users: arr });
      });
  }

  deleteUser = (id) => {
    API.delete(`/user/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const arr = this.state.users.filter(r => r.id !== id);
        this.setState({users: arr});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){

    //this.state.users.map(user => console.log(user));

    return (
      <div class="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-screen-smartphone"></i> <strong>Lista de Clientes</strong> <div className="pull-right"><BadgeRole role={'cliente'}/></div>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Username</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.users.map( (user, index) =>
                    <tr key={index} className="text-center">
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.username}</td>
                      <td>
                        <Link to={`/users/view/${user.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                        &nbsp;
                        <Link to={`/users/edit/${user.id}`}><Button size="sm" color="success"><i className="cui-pencil"></i></Button></Link>
                        &nbsp;
                        <Button onClick={ () => this.deleteUser(user.id) } size="sm" color="danger"><i className="cui-trash"></i></Button>
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
