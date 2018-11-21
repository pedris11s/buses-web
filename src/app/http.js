import React from 'react';
import AuthService from '../services/AuthService';
import {API_ROOT} from "../config";

const Auth = new AuthService();

export default class Http extends React.Component {
  listOfOficinas() {
    return request({
      endpoint: '/oficina',
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
    headers['Authorization'] = 'Bearer ' + Auth.getToken()

  let params = {
    method, headers
  }

  console.log(id_token);

  if(method === "POST")
    params.body = body;

  console.log(API_ROOT, endpoint, params);

  return fetch(API_ROOT + endpoint, params)
    .then(res => {
      //console.log(res);
      if(!res.success){
        let error = new Error();
        error.response = res;
        throw error;
      }
      return res.json();
    });
}

