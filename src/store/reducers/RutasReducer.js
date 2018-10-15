import { SET_RUTAS, ADD_RUTA, DEL_RUTA } from '../types';

const defaultState = {
  rutas: []
};

export default function(state = defaultState, action) {
  //alert(JSON.stringify(action));
  switch (action.type) {
    case SET_RUTAS:
      return {...state, rutas: action.payload};
    case ADD_RUTA:
      return {...state, rutas: [...state.rutas, action.payload] };
    //TODO del from store
    case DEL_RUTA:
      let id = action.payload.id;
      return {...state,  rutas: [...state.rutas, action.payload]};

  }
  return state;
}
