import React from 'react';
import AuthService from './AuthService';
import {API_ROOT} from "../config";
import axios from 'axios';

const Auth = new AuthService();

export default class Http extends React.Component {
  listOfOficinas() {
    return request({
      endpoint: '/oficina',
      method: 'GET',
      id_token: Auth.getToken()
    });
  }

  listOfCoops() {
    return request({
      endpoint: '/cooperativa',
      method: 'GET',
      id_token: Auth.getToken()
    });
  }

  listOfRutas() {
    return request({
      endpoint: '/ruta',
      method: 'GET',
      id_token: Auth.getToken()
    });
  }

  listOfBuses() {
    return request({
      endpoint: '/bus',
      method: 'GET',
      id_token: Auth.getToken()
    });
  }

  getOficinaById(id){
    return request({
      endpoint: `/oficina/${id}`,
      method: 'GET',
      id_token: Auth.getToken()
    });
  }

  getCoopById(id){
    return request({
      endpoint: `/cooperativa/${id}`,
      method: 'GET',
      id_token: Auth.getToken()
    });
  }

  getRutaById(id){
    return request({
      endpoint: `/ruta/${id}`,
      method: 'GET',
      id_token: Auth.getToken()
    });
  }
}

export function request({
                          endpoint,
                          body,
                          id_token = null,
                          method = "POST",
                          contentType = 'application/json',
                          accept = 'application/json'
                        }){

  var headers = {
    "Accept": accept,
    "Content-Type": contentType
  }

  if(id_token !== null)
    headers['Authorization'] = 'Bearer ' + Auth.getToken();

  let params = {
    method, headers
  }

  if(method === "POST")
    params.body = body;

  console.log(params);

  return axios(API_ROOT + endpoint, params)
    .then(res => {
      console.log(res);
      if(res.statusText != "OK"){
        let error = new Error();
        error.response = res;
        throw error;
      }
      return res;
    });
}

