import axiosInstance from './axiosInstance';

const API = {};

// getItemStates
API.getItemStates = () => axiosInstance
  .get('item_states')
  .then((response) => response.data)
  .catch((error) => error);

// getItemState
API.getItemState = (id) => axiosInstance
  .get(`item_states/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addItemState
API.addItemState = (formData) => axiosInstance
  .post('item_states/', {
    item_state: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
