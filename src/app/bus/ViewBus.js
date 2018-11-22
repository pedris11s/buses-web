import React from 'react';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';

export default class ViewBus extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      bus: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/bus/${id}`)
      .then(res => {
        const b = res.data;
        //console.log(r);
        this.setState({ bus: b});
      });
  }

  render(){

   /* let cooperativa = (this.state.ruta.cooperativa === undefined || this.state.ruta.cooperativa === null) ? "Desconocida" : this.state.ruta.cooperativa;
    let buses = (this.state.ruta.buses === undefined || this.state.ruta.buses.length === 0) ? "No hay buses." : this.state.ruta.buses;

    console.log("ATRIBUTO BUSES ES UNA DUDA!!!");
    console.log(this.state.ruta);*/

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div class="pull-right">
              <a href="" >
                <Button size="sm" color="success"><i className="icon-pencil"></i>&nbsp;Editar bus</Button>
              </a>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col xs="9">
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Bus id: {this.state.bus.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col >
                    <Table responsive striped hover>
                      <tbody>
                      <tr>
                        <td>Placa:</td>
                        <td><strong>{this.state.bus.placa}</strong></td>
                      </tr>
                      <tr>
                        <td>No. Bus:</td>
                        <td><strong>{this.state.bus.nobus}</strong></td>
                      </tr>
                      <tr>
                        <td>Frecuencia:</td>
                        <td><strong>{this.state.bus.frecuencia}</strong></td>
                      </tr>
                      <tr>
                        <td>Marca:</td>
                        <td><strong>{this.state.bus.marca}</strong></td>
                      </tr>
                      <tr>
                        <td>Cooperativa:</td>
                        <td><strong>{this.state.bus.placa}</strong></td>
                      </tr>
                      <tr>
                        <td>Creado:</td>
                        <td><strong>{this.state.bus.createdAt}</strong></td>
                      </tr>
                      <tr>
                        <td>Modificado:</td>
                        <td><strong>{this.state.bus.updatedAt}</strong></td>
                      </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col xs="3">
            <Card>
              <CardHeader className="text-center">
                <i className="icon-cursor"></i> Rutas
              </CardHeader>
              <CardBody className="text-center">
                <strong>POR ARREGLAR!!!</strong>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

