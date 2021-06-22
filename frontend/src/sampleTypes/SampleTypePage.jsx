import React, {useState, useEffect} from 'react';

import '../App.css';
import sampleTypesAPI from "../api/sampleTypesAPI";
import SampleType from "./_sampleType";

const SampleTypePage = ({match}) => {
  // default members to empty array
  const sampleTypeId = match.params.id
  const [sampleType, setSampleType] = useState({});

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await sampleTypesAPI.getSampleType(sampleTypeId);
      if (!response) return;

      // success
      setSampleType(response);
    };

    init();
  }, []);

  const editSampleType = () => {
    alert('TODO: Edit SampleType')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/sample_types">SampleTypes</a>
        <span>></span>
        {sampleType.name}
        <span>></span>
        <button onClick={() => editSampleType()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {sampleType.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {sampleType.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {sampleType.description}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Category
          </div>
          <div className="flex-col-2">
            {sampleType.category}
          </div>
        </div>

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default SampleTypePage;
