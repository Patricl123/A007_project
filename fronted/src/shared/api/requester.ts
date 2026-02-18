import axios from 'axios';

export const requester = axios.create({
    baseURL: 'https://mathgenie-server.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});
