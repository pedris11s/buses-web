import { connect } from 'react-redux';
import ListarRutas from './ListarRutas';

import * as RutasActions from '../../store/actions/RutasActions';

const mapStateToProps = state => {
  return {
    rutas: state.rutas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRutas: (rutas) => {
      dispatch(RutasActions.setRutas(rutas));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListarRutas);
