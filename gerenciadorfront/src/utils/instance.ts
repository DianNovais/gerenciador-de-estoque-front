import axios from 'axios';
import { getTokenAuthorization, setCookies } from './handleCookies';


const instanceApiMain = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        Authorization: `Bearer ${getTokenAuthorization()}`
    }
})

instanceApiMain.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.status === 401){
        setCookies('token=');
        window.location.reload();
    }
    return Promise.reject(error);
  });


export {instanceApiMain};