import React from 'react';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';

export default class ViewRuta extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ruta: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/ruta/${id}`)
      .then(res => {
        const r = res.data;
        //console.log(r);
        this.setState({ ruta: r});
      });
  }

  render(){

    console.log(this.state.ruta.cooperativa);

    let cooperativas = (this.state.ruta.cooperativa === undefined ||
                        this.state.ruta.cooperativa === null ||
                        this.state.ruta.cooperativa.length === 0) ?
                        <strong>No asignado</strong>
                        : this.state.ruta.cooperativa.map(coop =>
                          <tr>
                            <td>{coop}</td>
                          </tr>
                        );
    console.log(cooperativas);

    return (
      <div className="animated fadeIn">

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
                      </tbody>
                    </Table>
                  </Col>

                  <Col xs="3">
                    <Card>
                      <CardHeader className="text-center">
                        <i className="icon-home"></i> Cooperativas
                      </CardHeader>
                      <CardBody className="text-center">
                        { cooperativas }
                      </CardBody>
                    </Card>

                    <Button color="success" block><i className="icon icon-pencil"></i> Edit</Button>
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

