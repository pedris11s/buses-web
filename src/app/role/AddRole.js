import React from 'react';
import { Button, Table, Card, CardBody, CardHeader, Col, Form, Input, Row } from 'reactstrap';
import API from '../../services/api';

export default class AddRole extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
    }

    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNombreChange = event => {
    this.setState({ name: event.target.value, });
  }

  handleSubmit = event => {
    event.preventDefault();

    const role = {
      name: this.state.name,
    }

    API.post(`/role/`, role)
      .then(res => {
        //console.log(res.data);
        this.setState({
          name: '',
        })
        this.props.history.push('/roles');
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
                    <i className="fa fa-plus-square-o"></i> <strong>Crear rol</strong>
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
                        <Button type="submit" color="primary" block><i className="fa fa-dot-circle-o"></i> Submit</Button>
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
