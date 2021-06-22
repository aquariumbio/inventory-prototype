import React, {useState, useEffect} from 'react';

import '../App.css';
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import CompositeSampleType from "./_compositeSampleType";

const CompositeSampleTypePage = ({match}) => {
  // default members to empty array
  const compositeSampleTypeId = match.params.id
  const [compositeSampleType, setCompositeSampleType] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await compositeSampleTypesAPI.getCompositeSampleType(compositeSampleTypeId);
      if (!response) return;

      // success
      setCompositeSampleType(response.results);
      setRecipes(response.recipes);
    };

    init();
  }, []);

  const editCompositeSampleType = () => {
    alert('TODO: Edit CompositeSampleType')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/composite_sample_types">CompositeSampleTypes</a>
        <span>></span>
        {compositeSampleType.name}
        <span>></span>
        <button onClick={() => editCompositeSampleType()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {compositeSampleType.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {compositeSampleType.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {compositeSampleType.description}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Class
          </div>
          <div className="flex-col-2">
            {compositeSampleType.composite_sample_class}
          </div>
        </div>

        {compositeSampleType.composite_sample_class == 'fixed' ? (
          <div className="flex box-row">
            <div className="flex-col-1">
              Recipe
            </div>
            <div className="flex-col-2">
            </div>
          </div>
        ) : (
          <>
          </>
        )}


        {recipes.map((recipe) => (
          <div className="flex box-row">
            <div className="flex-col-1">
              Sample Type
            </div>
            <div className="flex-col-2">
              {recipe.name}
            </div>
          </div>
        ))}

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default CompositeSampleTypePage;

