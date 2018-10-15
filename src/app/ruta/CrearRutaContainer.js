import { connect } from 'react-redux';

import * as RutasActions from '../../store/actions/RutasActions';
import CrearRuta from "./CrearRuta";

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRuta: (ruta) => {
      dispatch(RutasActions.addRuta(ruta));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrearRuta);
