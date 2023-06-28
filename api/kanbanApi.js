import axios from "axios";

//import {AxiosRequestConfig,AxiosRequestHeaders} from "axios";


const baseURL = process.env.NODE_ENV ==='development' ? 'http://localhost:4000/api': 'https://task-managment-back-end-production.up.railway.app/api'

export const kanbanApi = axios.create({
   
    baseURL:baseURL
    
})



kanbanApi.interceptors.request.use((config) =>{
    
    config.headers = {
       ...config.headers,
       'x-token':localStorage.getItem('token')
    }
   return config;
})