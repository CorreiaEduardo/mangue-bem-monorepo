import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.g2bc.uneb.br:9081',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err.message);
    throw err;
  },
);

export default api;
