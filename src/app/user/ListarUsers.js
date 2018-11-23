import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import API from '../../services/api';

export default class ListarUsers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      viewRedirect: false,
      viewModal: false
    }

    this.deteleUser = this.deleteUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
  }

  deleteUser = (id) => {
    API.delete(`/user/${id}`)
      .then(res => {
        const arr = this.state.users.filter(r => r.id !== id);
        this.setState({users: arr});
      })
      .catch(err => {
        //FIXME
        alert("soy un error" + err);
      });
  }

  setViewRedirect = () => {
    this.setState({viewRedirect: true});
  }

  viewUser = (id) => {
    //console.log("ENTRE AQUI!!!!");
    const link = `/users/view/${id}`;
    if(this.state.viewRedirect)
      return <Redirect to={link}/>
  }

  componentDidMount(){
    //cargar usuarios con rol "cliente"
  }

  render(){
    return (
      <div class="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="icon-screen-smartphone"></i> <strong>Lista de Clientes</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.users.map( (user, index) =>
                    <tr key={index}>
                      <td></td>
                      <td>{user.username}</td>
                      <td></td>
                      <td></td>
                      <td>
                        {this.viewUser(user.id)}
                        <Button onClick={ this.setViewRedirect } size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
                        &nbsp;
                        <Button onClick={ () => this.deleteUser(user.id) } size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
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
