import axiosInstance from './axiosInstance';

const API = {};

// getContainerTypes
API.getContainerTypes = () => axiosInstance
  .get('container_types')
  .then((response) => response.data)
  .catch((error) => error);

// getContainerType
API.getContainerType = (id) => axiosInstance
  .get(`container_types/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addContainerType
API.addContainerType = (formData) => axiosInstance
  .post('container_types/', {
    container_type: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
