import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Input, Row } from 'reactstrap';
import API from '../../services/api';

export default class EditRole extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/role/${id}`)
      .then(res => {
        const r = res.data;
        this.setState({ name: r.name });
      });
  }

  handleNombreChange = event => {
    this.setState({ name: event.target.value, });
  }

  handleSubmit = event => {
    event.preventDefault();

    const role = {
      name: this.state.name,
    }
    const id = this.props.match.params.id.toString();
    API.put(`/role/${id}`, role)
      .then(res => {
        this.props.history.push(`/roles/view/${id}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col xs={6}>
              <Form onSubmit={this.handleSubmit} className="form-horizontal">
                <Card>
                  <CardHeader>
                    <i className="icon-pencil"></i> <strong>Editar rol</strong>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        <Table responsive striped hover>
                          <tbody>
                          <tr>
                            <td>Nombre:</td>
                            <td><Input type="text" value={this.state.name} onChange={this.handleNombreChange} required/></td>
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
