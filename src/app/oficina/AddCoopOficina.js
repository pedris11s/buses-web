import React from 'react';
import { FormGroup, Form, Label, Modal, ModalHeader, Input, ModalBody, Button } from 'reactstrap';
import {API_ROOT} from "../../config";
import axios from 'axios';

export default class AddCoopRuta extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modal: false,
      cooperativa: '',
      cooperativas: []
    }
    this.toggle = this.toggle.bind(this);
    this.handleCoopOnChange = this.handleCoopOnChange.bind(this);
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/cooperativa`)
      .then(res => {
        const coops = res.data;
        //console.log(coops[0]);
        this.setState({
          cooperativas: coops,
          cooperativa: coops[0].id
        })
      })

  }

  toggle(){
    this.setState({modal: !this.state.modal})
  }

  handleCoopOnChange = event => {
    this.setState({cooperativa: event.target.value});
  }

  handleSubmit = event => {
    //console.log("entre aqui!");
    //console.log(this.state.cooperativa);
    event.preventDefault();

    const id = this.props.oficina.id;

    axios.put(`${API_ROOT}/oficina/${id}`, {
      cooperativa: this.state.cooperativa
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  render(){
    return (
      <div>
        <Button hidden={this.props.hidden} color="success" onClick={this.toggle}>
          <i className="fa fa-industry"></i>&nbsp;Add Cooperativa
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}
               className={'modal-blanco'}>
          <ModalHeader toggle={this.toggle}><i className="fa fa-industry"></i>&nbsp;Add Cooperativa</ModalHeader>
          <ModalBody>
            <Form inline>
              <FormGroup className="pr-1">
                <Label htmlFor="exampleInputEmail2" className="pr-1">Cooperativa: </Label>
                <Input type="select" name="select-coops" id="select" onChange={this.handleCoopOnChange} required>
                  { this.state.cooperativas.map( coop => <option key={coop.id} value={coop.id}>{coop.nombre}</option>) }
                </Input>
              </FormGroup>
              <FormGroup className="pr-1">
                <Button onClick={this.handleSubmit} color="success"><i className="fa fa-plus"></i>&nbsp;Adicionar</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
