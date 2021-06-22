import axiosInstance from './axiosInstance';

const API = {};

// getSampleTypeCategories
API.getSampleTypeCategories = () => axiosInstance
  .get('sample_type_categories')
  .then((response) => response.data)
  .catch((error) => error);

// getSampleTypeCategory
API.getSampleTypeCategory = (id) => axiosInstance
  .get(`sample_type_categories/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addSampleTypeCategory
API.addSampleTypeCategory = (formData) => axiosInstance
  .post('sample_type_categories/', {
    sample_type_category: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
