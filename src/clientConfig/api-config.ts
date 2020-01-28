import axios from "axios";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:9999";
} else if (hostname === "blackq.herokuapp.com") {
  backendHost = "https://blackq.herokuapp.com";
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST;
}

export const API_ROOT = `${backendHost}/api/`;

axios.defaults.baseURL = API_ROOT;

if (process.env.NODE_ENV === "development") {
  console.log("process.env.NODE_ENV - ", process.env.NODE_ENV);
}

axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return Promise.resolve(response);
  },
  (error) => {
    switch (error.response.status) {
      case 666:
        window.location.href = "/login";
        break;

      default:
        return Promise.reject(error);
    }
  }
);
