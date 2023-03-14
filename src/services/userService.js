import axios from 'axios'
import { strings } from '../utils/strings';

export const userService = {
    getData,
    loginService,
    getErrorData,
    getNotification,
}
let applicationConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let applicationAuthConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access-token"),
    },
  };

function loginService(data){
    return axios
    .post(strings.baseUrl + strings.api.login,data,applicationConfig)
    .then((response)=>{
        console.log(response)
        return response
    })
    .catch((error)=>{
        console.log(error.response)
        return error.response
    })
}

function getData (){
    return axios 
    .get(strings.baseUrl+strings.api.getAllData,applicationAuthConfig)
    .then((response)=>{
        
        return response;
    })
    .catch((error)=>{
        return error
   })
}
function getErrorData(){
    console.log("hit",strings.baseUrl+strings.api.getFilteredData)
    return axios 
    .get(strings.baseUrl+strings.api.getFilteredData,applicationAuthConfig)
    .then((response)=>{
        if (response && response.status && response.status === 200){
            console.log(response.data)
            // localStorage.setItem("data",JSON.stringify(response.data))
            return response
        }
        return response;
    })
    .catch((error)=>{
        console.log(error)
        return error
   })
}

function getNotification(){
    return axios
    .get('http://127.0.0.1:5000/notification')
    .then((response)=>{
        if (response && response.status && response.status === 200){
            console.log(response.data)
            // localStorage.setItem("data",JSON.stringify(response.data))
            return response
        }
        return response;
    })
    .catch((error)=>{
        return error
    })
}