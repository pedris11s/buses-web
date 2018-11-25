import React, { Component } from 'react';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import AuthService from '../services/AuthService';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',

      alertVisible: false,
      alertText: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount(){
    if(this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }


  handleUsernameChange(e){
    this.setState({ username: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({ password: e.target.value});
  }

  handleFormSubmit(e){
    e.preventDefault();

    this.Auth.login(this.state.username,this.state.password)
      .then(res =>{
        if(res.success)
          this.props.history.replace('/');
        else{
          this.setState({
            username: '',
            password: ''
          });
        }
      })
      .catch(err => {
        this.setState({
          alertVisible: true,
          alertText: err.toString()
        });
      });
  }

  dissmissAlert(){
    this.setState({alertVisible: false});
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <Alert isOpen={this.state.alertVisible} toggle={this.dissmissAlert.bind(this)} color="danger" className="text-center">
                {this.state.alertText}
              </Alert>
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
                        <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleUsernameChange} required/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
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
