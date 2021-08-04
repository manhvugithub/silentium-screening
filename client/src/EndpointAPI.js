import axios from 'axios';

export const API_EP = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
    },
    timeout: 30000,
});
