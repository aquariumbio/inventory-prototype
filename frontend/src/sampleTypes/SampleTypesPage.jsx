import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import sampleTypesAPI from "../api/sampleTypesAPI";
import SampleType from "./_sampleType";

const SampleTypesPage = () => {
  const history = useHistory();
  // default sampleTypes to empty array
  const [sampleTypes, setSampleTypes] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get sampleTypes
      const response = await sampleTypesAPI.getSampleTypes();
      if (!response) return;

      // success
      setSampleTypes(response);
    };

    init();
  }, []);

  const newSampleType = () => {
    history.push('/sample_types/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        SampleTypes
        <span></span>
        <button onClick={() => newSampleType()}>New SampleType</button>
      </div>

      <div className="flex flex-title">
        <div className="flex-col-1">
          Name
        </div>
        <div className="flex-col-2">
          Description
        </div>
        <div className="flex-col-2">
          Category
        </div>
      </div>

      {sampleTypes.map((sampleType) => (
        <SampleType sampleType={sampleType} />
      ))}
    </>
  );
}

export default SampleTypesPage;

