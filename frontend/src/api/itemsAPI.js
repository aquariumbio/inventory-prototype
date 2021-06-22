import axiosInstance from './axiosInstance';

const API = {};

// getItems
API.getItems = () => axiosInstance
  .get('items')
  .then((response) => response.data)
  .catch((error) => error);

// getItem
API.getItem = (id) => axiosInstance
  .get(`items/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addItem
API.addItem = (formData) => axiosInstance
  .post('items/', {
    item: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
