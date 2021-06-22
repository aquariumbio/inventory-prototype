import axiosInstance from './axiosInstance';

const API = {};

// getCompositeSampleTypeStates
API.getCompositeSampleTypeStates = () => axiosInstance
  .get('composite_sample_type_states')
  .then((response) => response.data)
  .catch((error) => error);

// getCompositeSampleTypeState
API.getCompositeSampleTypeState = (id) => axiosInstance
  .get(`composite_sample_type_states/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addCompositeSampleTypeState
API.addCompositeSampleTypeState = (formData) => axiosInstance
  .post('composite_sample_type_states/', {
    composite_sample_type_state: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
