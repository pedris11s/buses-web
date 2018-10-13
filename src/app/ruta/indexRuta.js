import React from 'react';

import ListarRutas from './ListarRutas';
import CrearRuta from './CrearRuta';

export default class indexRuta extends React.Component{
  render(){
    return(
      <div>
        <CrearRuta/>
        <ListarRutas/>
      </div>
    );
  }

}
