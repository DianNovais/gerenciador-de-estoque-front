import axios from 'axios';
import { getTokenAuthorization } from './handleCookies';


const instanceApiMain = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        Authorization: `Bearer ${getTokenAuthorization()}`
    }
})


export {instanceApiMain};