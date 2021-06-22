import axiosInstance from './axiosInstance';

const API = {};

// getSampleTypes
API.getSampleTypes = () => axiosInstance
  .get('sample_types')
  .then((response) => response.data)
  .catch((error) => error);

// getSampleType
API.getSampleType = (id) => axiosInstance
  .get(`sample_types/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addSampleType
API.addSampleType = (formData) => axiosInstance
  .post('sample_types/', {
    sample_type: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
