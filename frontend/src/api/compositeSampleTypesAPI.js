import axiosInstance from './axiosInstance';

const API = {};

// getCompositeSampleTypes
API.getCompositeSampleTypes = () => axiosInstance
  .get('composite_sample_types')
  .then((response) => response.data)
  .catch((error) => error);

// getCompositeSampleType
API.getCompositeSampleType = (id) => axiosInstance
  .get(`composite_sample_types/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addCompositeSampleType
API.addCompositeSampleType = (formData) => axiosInstance
  .post('composite_sample_types/', {
    composite_sample_type: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
