import axios from 'axios';

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:9999';
}
else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:9999';
}

export const API_ROOT = `${backendHost}/api/`;

axios.defaults.baseURL = API_ROOT;

if (process.env.NODE_ENV === 'development') {
  console.log('dev - add axios credentials conf');

  // axios.defaults.withCredentials = true;
}

axios.interceptors.response.use(
  response => {
    // Do something with response data
    return Promise.resolve(response);
  },
  error => {
    return Promise.reject(error);
  });
