import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import sampleTypeCategoriesAPI from "../api/sampleTypeCategoriesAPI";
import SampleTypeCategory from "./_sampleTypeCategory";

const SampleTypeCategoriesPage = () => {
  const history = useHistory();
  // default sampleTypeCategories to empty array
  const [sampleTypeCategories, setSampleTypeCategories] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get sampleTypeCategories
      const response = await sampleTypeCategoriesAPI.getSampleTypeCategories();
      if (!response) return;

      // success
      setSampleTypeCategories(response);
    };

    init();
  }, []);

  const newSampleTypeCategory = () => {
    history.push('/sample_type_categories/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        SampleTypeCategories
        <span></span>
        <button onClick={() => newSampleTypeCategory()}>New SampleTypeCategory</button>
      </div>

      <div className="flex flex-title">
        <div className="flex-col-1">
          Name
        </div>
        <div className="flex-col-2">
          Description
        </div>
        <div className="flex-col-2">
        </div>
      </div>

      {sampleTypeCategories.map((sampleTypeCategory) => (
        <SampleTypeCategory sampleTypeCategory={sampleTypeCategory} />
      ))}
    </>
  );
}

export default SampleTypeCategoriesPage;

