import { SET_RUTAS, ADD_RUTA, DEL_RUTA } from "../types";

export const setRutas = (rutas) => {
  return {
    type: SET_RUTAS,
    payload: rutas
  }
};

export const addRuta = (ruta) => {
  return {
    type: ADD_RUTA,
    payload: ruta
  }
};

export const delRuta = (ruta) => {
  return {
    type: DEL_RUTA,
    payload: ruta
  }
};
