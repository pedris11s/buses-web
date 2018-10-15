import {combineReducers} from 'redux';

import rutas from './RutasReducer';

const appReducer = combineReducers({
  rutas
});

export default appReducer;
