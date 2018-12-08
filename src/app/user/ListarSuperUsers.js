import React from 'react';
import {Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import API from '../../services/api';
import BadgeRole from '../BadgeRole';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class ListarSuperUsers extends React.Component{
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
        const arr = u.filter(r => r.role.name !== 'cliente');
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
                <i className="icon-people"></i> <strong>Lista de Super Usuarios</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Username</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.users.map( (user, index) =>
                    <tr key={index} className="text-center">
                      <td>{user.username}</td>
                      {/*(user.role === null || user.role === undefined)*/}
                      {/*<td>{(user.role === null || user.role.name === undefined) ? "-" : user.role.name}</td>*/}
                      <td> <BadgeRole role={user.role.name}/> </td>
                      {/*<td>{user.role}</td>*/}
                      <td>
                        <Link to={`/users/view/${user.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                        &nbsp;
                        <Link to={`/users/edit/${user.id}`}><Button size="sm" color="success"><i className="icon-pencil"></i></Button></Link>
                        &nbsp;
                        <Button onClick={ () => this.deleteUser(user.id) } size="sm" color="danger"><i className="fa fa-trash"></i></Button>
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
