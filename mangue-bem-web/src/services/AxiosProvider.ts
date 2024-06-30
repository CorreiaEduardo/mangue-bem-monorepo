import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
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
