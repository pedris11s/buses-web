import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import AuthService from '../services/AuthService';

class Login extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount(){
    if(this.Auth.loggedIn()) {
      //alert("ESTAS LOGUEADO");
      this.props.history.replace('/');
    }
  }


  handleChange(e){
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleFormSubmit(e){
    e.preventDefault();

    this.Auth.login(this.state.username,this.state.password)
      .then(res =>{
        this.props.history.replace('/');
      })
      .catch(err =>{
        alert(err);
      })
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleFormSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={this.handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col>
                          <Button type="submit" color="primary" block><i className="fa fa-sign-in"></i> Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
