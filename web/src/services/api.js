import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://devradar-omnistack-10.herokuapp.com'
});

export default api;
