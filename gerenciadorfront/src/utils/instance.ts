import axios from 'axios';


export const instanceApiMain = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    timeout: 1000,
})