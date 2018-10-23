import React from 'react';
import ListarOficinas from "./ListarOficinas";
import AddOficina from "./AddOficina";

export default class indexOficina extends React.Component{
  render(){
    return (
      <div>
        <AddOficina/>
        <ListarOficinas/>
      </div>
    )
  }
}
