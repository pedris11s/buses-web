import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import API from '../../services/api';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      name: '',
      lastname: '',

      alertVisible: false,
      alertText: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleUsernameChange(e){
    this.setState({ username: e.target.value});
  }

  handleEmailChange(e){
    this.setState({ email: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({ password: e.target.value});
  }

  handleNameChange(e){
    this.setState({ name: e.target.value});
  }

  handleLastNameChange(e){
    this.setState({ lastname: e.target.value});
  }


  handleFormSubmit(e){
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      lastname: this.state.lastname
    }

    console.log(user);

    API.post(`/auth/local/register`, user)
      .then(res => {
        this.props.history.replace('/login');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.handleFormSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Name" autoComplete="name" value={this.state.name} onChange={this.handleNameChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Lastname" autoComplete="lastname" value={this.state.lastname} onChange={this.handleLastNameChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" value={this.state.username} onChange={this.handleUsernameChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value={this.state.password} onChange={this.handlePasswordChange}/>
                    </InputGroup>

                    <Button type="submit" color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
