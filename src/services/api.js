import { create } from 'apisauce';

const api = create({
  baseURL: 'http://192.168.56.1:8080',
});

export default api;
