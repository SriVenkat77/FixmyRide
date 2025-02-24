import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    withCredentials: true,
});

export default request;
