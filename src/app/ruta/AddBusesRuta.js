import React from 'react';
import { FormGroup, Form, Label, Modal, ModalHeader, Input, ModalBody, Button } from 'reactstrap';
import axios from "axios";
import {API_ROOT} from "../../config";

export default class AddBusesRuta extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      modal: false,
      buses: [],
    }

    this.toggle = this.toggle.bind(this);
    this.handleBusesChange = this.handleBusesChange.bind(this);
  }

  componentDidMount(){
    axios.get(`${API_ROOT}/bus`)
      .then(res => {
        const buss = res.data;
        this.setState({
          buses: buss
        })
      });

  }

  toggle(){
    this.setState({modal: !this.state.modal})
  }

  handleBusesChange = event => {
    //this.setState({ coop_ruta: event.target.value, });
    let options = event.target.options;
    //console.log(options);
    let value = [];
    for (let i = 0, size = options.length; i < size; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({buses_ruta: value});
    //console.log(value);
  }

  handleSubmit = event => {
    const id = this.props.ruta.id;

    axios.put(`${API_ROOT}/ruta/${id}`, {
      buses: this.state.buses_ruta
    }).then(res => {
      console.log(res.data);
      this.toggle();
    }).catch(err => {
      console.log(err);
    })
  }

  render(){
    return (
     <div>
       <div>
         <Button color="primary" onClick={this.toggle}>
           <i className="fa fa-bus"></i>&nbsp;Add Buses
         </Button>
         <Modal isOpen={this.state.modal} toggle={this.toggle}
                className={'modal-blanco'}>
           <ModalHeader toggle={this.toggle}><i className="fa fa-bus"></i>&nbsp;Add Buses</ModalHeader>
           <ModalBody>
             <Form onSubmit={this.handleSubmit} method="post" inline>
               <FormGroup className="pr-1">
                 <Label htmlFor="exampleInputEmail2" className="pr-1">Buses: </Label>
                 <Input type="select" name="select-bus" id="multiple-select" multiple onChange={this.handleBusesChange} required>
                   { this.state.buses.map( bus => <option key={bus.id} value={bus.id}>{bus.nobus}</option>) }
                 </Input>
               </FormGroup>
               <FormGroup className="pr-1">
                 <Button type="submit" color="primary" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp;Adicionar</Button>
               </FormGroup>
             </Form>
           </ModalBody>
         </Modal>
       </div>
     </div>
    )
  }
}
