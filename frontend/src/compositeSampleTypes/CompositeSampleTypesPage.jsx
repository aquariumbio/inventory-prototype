import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import CompositeSampleType from "./_compositeSampleType";

const CompositeSampleTypesPage = () => {
  const history = useHistory();
  // default compositeSampleTypes to empty array
  const [compositeSampleTypes, setCompositeSampleTypes] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get compositeSampleTypes
      const response = await compositeSampleTypesAPI.getCompositeSampleTypes();
      if (!response) return;

      // success
      setCompositeSampleTypes(response);
    };

    init();
  }, []);

  const newCompositeSampleType = () => {
    history.push('/composite_sample_types/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        CompositeSampleTypes
        <span></span>
        <button onClick={() => newCompositeSampleType()}>New CompositeSampleType</button>
      </div>

      <div className="flex flex-title">
        <div className="flex-col-1">
          Name
        </div>
        <div className="flex-col-2">
          Description
        </div>
        <div className="flex-col-2">
          Class
        </div>
      </div>

      {compositeSampleTypes.map((compositeSampleType) => (
        <CompositeSampleType compositeSampleType={compositeSampleType} />
      ))}
    </>
  );
}

export default CompositeSampleTypesPage;

