import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://devradar-omnistack-10.herokuapp.com'
});
