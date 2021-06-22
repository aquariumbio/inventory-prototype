import axios from 'axios';

// xapikey should be an env variable...
const baseurl = "http://localhost:3001/api/v1";

// Axios instance
const axiosInstance = axios.create({
  baseURL: baseurl,
});

// intercept response
axiosInstance.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line consistent-return
  (error) => {
    const { status, data } = error.response;
    if (status) {
      alert(`${status}: ${data.message}`)
      window.location.reload(true)
      return false;
    }
  },
);

export default axiosInstance;
