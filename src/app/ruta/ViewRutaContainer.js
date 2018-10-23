import { connect } from 'react-redux';

import ViewRutas from "./ViewRuta";

const mapStateToProps = state => {
  return {
    rutas: state.rutas
  };
};

export default connect(
  mapStateToProps,
)(ViewRutas);
