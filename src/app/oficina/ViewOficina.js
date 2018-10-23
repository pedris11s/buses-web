import React from 'react';
import axios from "axios";
import {API_ROOT} from "../../config";

export default class ViewOficina extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      oficina: []
    }
  }

  componentDidMount(){
    const id = this.props.match.params.id.toString();
    axios.get(`${API_ROOT}/oficina/${id}`)
      .then(res => {
        const off = res.data;
        //console.log(r);
        this.setState({oficina:off});
      });
  }

  render(){
    return (
      <div>
        YOY SOY LA VISTA!
      </div>
    )
  }
}
