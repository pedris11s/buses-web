import React from 'react';
import axios from 'axios';

import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {API_ROOT} from "../../config";
import AddCoopRuta from "./AddCoopRuta";
import AddBusesRuta from "./AddBusesRuta";


const CoopRow = props => {
  console.log(props.coopRowVisibility);
  if(props.coopRowVisibility)
    return (
      <div>
        <tr hidden={props.coopRowVisibility}>
          <td>Cooperativa:</td>
          <td><strong>{props.cooperativa.nombre}</strong></td>
        </tr>
      </div>
    );
  return (<div></div>);
}

export default class ViewRuta extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ruta: [],
      coopButton: false,
      busesButton: false
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    axios.get(`${API_ROOT}/ruta/${id}`)
      .then(res => {
        const r = res.data;
        //console.log(r);
        this.setState({ruta:r});
      });
  }

  render(){

    let coopButton, coopRowVisibility;
    console.log(this.state.ruta.cooperativa);
    if(this.state.ruta.cooperativa == null) {
      coopButton = <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"><AddCoopRuta hidden={false} ruta={this.state.ruta}/></Col>
      coopRowVisibility = false;
    }
    else {
      coopButton = <AddCoopRuta hidden={true} ruta={this.state.ruta}/>
      coopRowVisibility = true;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Ruta id: {this.state.ruta.id}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    <tr>
                      <td>Nombre:</td>
                      <td><strong>{this.state.ruta.nombre}</strong></td>
                    </tr>
                    <tr>
                      <td>Coo. Origen:</td>
                      <td><strong>{this.state.ruta.coo_origen}</strong></td>
                    </tr>
                    <tr>
                      <td>Coo.Destino:</td>
                      <td><strong>{this.state.ruta.coo_destino}</strong></td>
                    </tr>
                    <tr>
                      <td>Ciudad Origen:</td>
                      <td><strong>{this.state.ruta.ciudad_origen}</strong></td>
                    </tr>
                    <tr>
                      <td>Ciudad Destino:</td>
                      <td><strong>{this.state.ruta.ciudad_destino}</strong></td>
                    </tr>
                    <CoopRow coopRowVisibility={coopRowVisibility} cooperativa={this.state.ruta.cooperativa}/>
                  </tbody>
                </Table>
                <Row className="">
                  { coopButton }
                  <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                    <AddBusesRuta ruta={this.state.ruta}/>
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

