import React from 'react';
import { Button, Table,Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import API from '../../services/api';
import {Link} from 'react-router-dom';

export default class ViewOficina extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      oficina: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    API.get(`/oficina/${id}`)
      .then(res => {
        const off = res.data;
        this.setState({oficina:off});
      });
  }

  render(){

    let cooperativas = (this.state.oficina.cooperativas === undefined ||
                        this.state.oficina.cooperativas === null ||
                        this.state.oficina.cooperativas.length === 0) ?
                          <strong>No asignadas</strong>
                        : this.state.oficina.cooperativas.map(coop =>
                            <tr>
                              <td><a href={`/coops/view/${coop.id}`}>{coop.nombre}</a></td>
                            </tr>
                          );

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div class="pull-right">
              <Link to={`/oficinas/edit/${this.state.oficina.id}`}>
                <Button size="sm" color="success"><i className="icon-pencil"></i>&nbsp;Editar oficina</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <br/>

        <Row>
          <Col xs="9">
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Oficina id: {this.state.oficina.id}</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Table responsive striped>
                      <tbody>
                      <tr>
                        <td>Nombre:</td>
                        <td><strong>{this.state.oficina.nombre}</strong></td>
                      </tr>
                      <tr>
                        <td>Ciudad:</td>
                        <td><strong>{this.state.oficina.ciudad}</strong></td>
                      </tr>
                      <tr>
                        <td>Direccion:</td>
                        <td><strong>{this.state.oficina.direccion}</strong></td>
                      </tr>
                      <tr>
                        <td>Telefono:</td>
                        <td><strong>{this.state.oficina.telefono}</strong></td>
                      </tr>
                      <tr>
                        <td>Facebook:</td>
                        <td><strong>{this.state.oficina.facebook}</strong></td>
                      </tr>
                      <tr>
                        <td>Whatsapp:</td>
                        <td><strong>{this.state.oficina.whatsapp}</strong></td>
                      </tr>
                      <tr>
                        <td>Creada:</td>
                        <td><strong>{this.state.oficina.createdAt}</strong></td>
                      </tr>
                      <tr>
                        <td>Modificada:</td>
                        <td><strong>{this.state.oficina.updatedAt}</strong></td>
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
                <i className="icon-home"></i> Cooperativas
              </CardHeader>
              <CardBody className="text-center">
                <Table responsive hover>
                  <tbody>
                  {cooperativas}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
