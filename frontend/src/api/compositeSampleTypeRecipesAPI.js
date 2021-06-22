import axiosInstance from './axiosInstance';

const API = {};

// getCompositeSampleTypeRecipes
API.getCompositeSampleTypeRecipes = () => axiosInstance
  .get('composite_sample_type_recipes')
  .then((response) => response.data)
  .catch((error) => error);

// getCompositeSampleTypeRecipe
API.getCompositeSampleTypeRecipe = (id) => axiosInstance
  .get(`composite_sample_type_recipes/${id}`)
  .then((response) => response.data)
  .catch((error) => error);

// addCompositeSampleTypeRecipe
API.addCompositeSampleTypeRecipe = (formData) => axiosInstance
  .post('composite_sample_type_recipes/', {
    composite_sample_type_recipe: formData
  })
  .then((response) => response.data)
  .catch((error) => error);

export default API;
