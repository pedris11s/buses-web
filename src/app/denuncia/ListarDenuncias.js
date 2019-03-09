import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import {Link} from "react-router-dom";
import API from '../../services/api';

import AuthService from '../../services/AuthService';
import BadgeDenuncia from '../utils/BadgeDenuncia';
const auth = new AuthService();

export default class ListarDenuncias extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      denuncias: [],
    }

    // this.deleteCoop = this.deleteCoop.bind(this);
  }

  componentDidMount(){
    API.get(`/denuncia`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
      .then(res => {
        const d = res.data;
        this.setState({denuncias: d});
      })
      .catch(err => {
        console.log(err);
      });
  }

//   deleteCoop(id){
//     API.delete(`/cooperativa/${id}`, { headers: {"Authorization" : `Bearer ${auth.getToken()}`} })
//       .then(res => {
//         const arr = this.state.cooperativas.filter(r => r.id !== id);
//         this.setState({cooperativas: arr});
//       })
//       .catch(err => {
//         console(err);
//       });
//   }

  render(){
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-warning"></i> <strong>Lista de Denuncias</strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-center">
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>

                      {
                        this.state.denuncias.map((den, index) =>
                          <tr key={index} className="text-center">
                            <td><BadgeDenuncia text={den.estado} /></td>
                            <td>

                              <Link to={`/denuncias/view/${den.id}`}><Button size="sm" color="primary"><i className="cui-magnifying-glass"></i></Button></Link>
                              {/* &nbsp;
                              <Button size="sm" color="success"><i className="fa fa-check"></i></Button>
                              &nbsp;
                              <Button size="sm" color="danger"><i className="fa fa-close"></i></Button>
                              &nbsp; */}
                              {/* <Button onClick={ () => this.deleteCoop(coop.id) } size="sm" color="danger"><i className="cui-trash"></i></Button> */}
                            </td>
                          </tr>
                      )}
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
