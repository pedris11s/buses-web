import React from 'react';

import ListarRutas from './ListarRutasContainer';
import CrearRuta from './CrearRutaContainer';

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
