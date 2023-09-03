import axios from "axios";
import { unauthorizedInterceptor } from "./axios.interceptors";


export const $axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

$axios.interceptors.response.use(undefined, unauthorizedInterceptor);
