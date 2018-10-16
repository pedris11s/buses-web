import React from 'react';

import ListarRutas from './ListarRutasContainer';
import AddRuta from './AddRutaContainer';

export default class indexRuta extends React.Component{
  render(){
    return(
      <div>
        <AddRuta/>
        <ListarRutas/>
      </div>
    );
  }

}
