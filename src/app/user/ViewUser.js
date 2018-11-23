import React from 'react';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';

export default class ViewUser extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/user/${id}`)
      .then(res => {
        const u = res.data;
        this.setState({user:u});
      });
  }

  render(){

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div class="pull-right">
              <a href="">
                <Button size="sm" color="success"><i className="icon-pencil"></i>&nbsp;Editar usuario</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col>
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
                        <td><strong>{ (this.state.user.nombre === undefined) ? "-" :  this.state.user.nombre}</strong></td>
                      </tr>
                      <tr>
                        <td>Username:</td>
                        <td><strong>{this.state.user.username}</strong></td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td><strong>{ (this.state.user.email === undefined) ? "-" :  this.state.user.email}</strong></td>
                      </tr>
                      <tr>
                        <td>Rol:</td>
                        <td><strong>{this.state.user.role}</strong></td>
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
