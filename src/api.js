import axios from 'axios';

const api = axios.create({
    baseURL: 'https://chamadotecnico-backend.herokuapp.com'
});

export default api;
