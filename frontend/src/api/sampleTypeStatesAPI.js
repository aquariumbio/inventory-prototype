import axiosInstance from './axiosInstance';

const API = {};

// getSampleTypeStates
API.getSampleTypeStates = () => axiosInstance
  .get('sample_type_states')
  .then((response) => response.data)
  .catch((error) => error);

// getSampleTypeState
API.getSampleTypeState = (id) => axiosInstance
  .get(`sample_type_states/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addSampleTypeState
API.addSampleTypeState = (formData) => axiosInstance
  .post('sample_type_states/', {
    sample_type_state: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
