import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Input, Row } from 'reactstrap';
import API from '../../services/api';

import AuthService from '../../services/AuthService';
const auth = new AuthService();

export default class EditUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      role_user: '',
      roles: []
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

    API.get(`/role`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        console.log(res.data);
        const arr = res.data;
          this.setState(
            {
              roles: arr,
            });
      })
      .catch(err => {
        console.log(err);
      });

    const id = this.props.match.params.id.toString();
    API.get(`/user/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const user = res.data;
        console.log(user.role.id);
        this.setState({
          username: user.username,
          role_user: user.role.id
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUsernameChange = event => {
    this.setState({ username: event.target.value, });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value, });
  }

  handleRoleChange = event => {
    this.setState({ role_user: event.target.value, });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      role: this.state.role_user,
    }

    const id = this.props.match.params.id.toString();
    API.put(`/user/${id}`, user, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        this.props.history.push(`/users/view/${id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <Card>
                  <CardHeader>
                    <i className="icon-pencil"></i> <strong>Editar usuario</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Username:</td>
                            <td><Input type="text" value={this.state.username} onChange={this.handleUsernameChange} required/></td>
                          </tr>
                          </tbody>
                        </Table>
                      </Col>

                      <Col xs="6">
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Rol:</td>
                            <td><Input type="select" value={this.state.role_user} onChange={this.handleRoleChange} required>
                              { this.state.roles.map( r => <option key={r.id} value={r.id}>{r.name}</option>) }
                            </Input></td>
                          </tr>
                          </tbody>
                        </Table>
                      </Col>

                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" color="success" block><i className="icon-pencil"></i> Editar</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
