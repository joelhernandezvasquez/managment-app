import axios from "axios";

//import {AxiosRequestConfig,AxiosRequestHeaders} from "axios";

export const kanbanApi = axios.create({
    baseURL:'http://localhost:4000/api'
})



kanbanApi.interceptors.request.use((config) =>{
    
    config.headers = {
       ...config.headers,
       'x-token':localStorage.getItem('token')
    }
   return config;
})