import axios from 'axios';

const api = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/rmpg', // Replace with your API base URL
});

export default api;
