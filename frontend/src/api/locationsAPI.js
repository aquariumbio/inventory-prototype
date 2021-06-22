import axiosInstance from './axiosInstance';

const API = {};

// getLocations
API.getLocations = () => axiosInstance
  .get('locations')
  .then((response) => response.data)
  .catch((error) => error);

// getLocation
API.getLocation = (id) => axiosInstance
  .get(`locations/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addLocation
API.addLocation = (formData) => axiosInstance
  .post('locations/', {
    location: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
