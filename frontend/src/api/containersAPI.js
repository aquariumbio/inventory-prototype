import axiosInstance from './axiosInstance';

const API = {};

// getContainers
API.getContainers = () => axiosInstance
  .get('containers')
  .then((response) => response.data)
  .catch((error) => error);

// getContainer
API.getContainer = (id) => axiosInstance
  .get(`containers/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addContainer
API.addContainer = (formData) => axiosInstance
  .post('containers/', {
    container: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
