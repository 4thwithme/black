import axios from "axios";

let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:9999";
} else if (hostname === "blackq.herokuapp.com") {
  backendHost = "blackq.herokuapp.com";
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST;
}

export const API_ROOT = hostname === "localhost" ? `${backendHost}/api/` : "/api/";

axios.defaults.baseURL = API_ROOT;

console.log("process.env.NODE_ENV - ", process.env.NODE_ENV);

axios.interceptors.response.use(
  (response) => {
    // Do something with response dataa
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
