import React from 'react';

import ListarCooperativas from "./ListarCooperativas";
import AddCooperativa from "./AddCooperativa";

export default class indexCooperativa extends React.Component{
  render(){
    return(
      <div>
        <AddCooperativa/>
        <ListarCooperativas/>
      </div>
    );
  }

}
