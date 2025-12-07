import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tabuamare.devtu.qzz.io/api/v1', // Replace with your API base URL
});

export default api;
