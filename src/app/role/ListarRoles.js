import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import API from '../../services/api';

export default class ListarRoles extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      roles: [],
    }

    this.deteleRole = this.deteleRole.bind(this);
  }

  deteleRole = (id) => {
    API.delete(`/role/${id}`)
      .then(res => {
        const arr = this.state.roles.filter(r => r.id !== id);
        this.setState({roles: arr});
      })
      .catch(err => {
        //FIXME
        alert("soy un error" + err);
      });
  }

  componentDidMount(){
    API.get(`/role`)
      .then(res => {
        //console.log(res.data);
        const r = res.data;
        this.setState({ roles: r });
      });
  }

  render(){
    return (
      <div class="animated fadeIn">
        <Row>
          <Col xs={4}>
            <Card>
              <CardHeader>
                <i className="icon-options"></i> <strong>Lista de Roles</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.state.roles.map( (role, index) =>
                    <tr key={index}>
                      <td>{role.name}</td>
                      <td>
                        <Button href={`/roles/view/${role.id}`} size="sm" color="success" outline><i className="fa fa-lightbulb-o"></i></Button>
                        &nbsp;
                        <Button onClick={ () => this.deteleRole(role.id) } size="sm" color="danger" outline><i className="fa fa-trash"></i></Button>
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
