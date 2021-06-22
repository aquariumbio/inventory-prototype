import React, {useState, useEffect} from 'react';

import '../App.css';
import sampleTypeCategoriesAPI from "../api/sampleTypeCategoriesAPI";
import SampleTypeCategory from "./_sampleTypeCategory";

const SampleTypeCategoryPage = ({match}) => {
  // default members to empty array
  const sampleTypeCategoryId = match.params.id
  const [sampleTypeCategory, setSampleTypeCategory] = useState({});

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await sampleTypeCategoriesAPI.getSampleTypeCategory(sampleTypeCategoryId);
      if (!response) return;

      // success
      setSampleTypeCategory(response);
    };

    init();
  }, []);

  const editSampleTypeCategory = () => {
    alert('TODO: Edit SampleTypeCategory')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/sample_type_categories">SampleTypeCategories</a>
        <span>></span>
        {sampleTypeCategory.name}
        <span>></span>
        <button onClick={() => editSampleTypeCategory()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {sampleTypeCategory.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {sampleTypeCategory.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {sampleTypeCategory.description}
          </div>
        </div>

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default SampleTypeCategoryPage;

