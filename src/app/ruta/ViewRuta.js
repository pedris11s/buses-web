import React from 'react';
import axios from 'axios';

import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {API_ROOT} from "../../config";
import AddCoopRuta from "./AddCoopRuta";
import AddBusesRuta from "./AddBusesRuta";

export const CoopRow = props => {
  //console.log(props.coopRowVisibility);
  if(props.coopRowVisibility == true) {
    return (
      <tr>
        <td>Cooperativa:</td>
        <td><strong>{props.cooperativa.nombre}</strong></td>
      </tr>
    );
  }
  return (<div></div>);
}

export const BusesRow = props => {

  console.log(props.buses);
  let list = "hola";
  if(props.buses == null)
    list = "No hay buses para esta ruta.";

  return (
    <Card>
      <CardHeader className="text-center">
        <i className="fa fa-bus"></i> Buses
      </CardHeader>
      <CardBody className="text-center">
        { list }
      </CardBody>
    </Card>
  );
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

    let coopButton, coopRow;
    //console.log(this.state.ruta.cooperativa);
    if(this.state.ruta.cooperativa == null) {
      coopButton = <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"><AddCoopRuta hidden={false} ruta={this.state.ruta}/></Col>
      coopRow = <CoopRow coopRowVisibility={false} cooperativa={this.state.ruta.cooperativa}/>;
    }
    else {
      coopButton = <Col hidden={true} col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"><AddCoopRuta hidden={true} ruta={this.state.ruta}/></Col>
      coopRow = <CoopRow coopRowVisibility={true} cooperativa={this.state.ruta.cooperativa}/>;
    }

    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <div class="pull-right">
              <a href="">
                <Button size="sm" color="success"><i className="icon icon-pencil"></i>&nbsp;Edit ruta</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Ruta id: {this.state.ruta.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="9">
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
                      { coopRow }
                      </tbody>
                    </Table>
                    { coopButton }
                  </Col>

                  <Col xs="3">
                    <BusesRow buses={this.state.ruta.buses_ruta}/>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <AddBusesRuta ruta={this.state.ruta}/>
                    </Col>
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

