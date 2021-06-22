import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import containerTypesAPI from "../api/containerTypesAPI";
import ContainerType from "./_containerType";

const ContainerTypesPage = () => {
  const history = useHistory();
  // default containerTypes to empty array
  const [containerTypes, setContainerTypes] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get containerTypes
      const response = await containerTypesAPI.getContainerTypes();
      if (!response) return;

      // success
      setContainerTypes(response);
    };

    init();
  }, []);

  const newContainerType = () => {
    history.push('/container_types/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        ContainerTypes
        <span></span>
        <button onClick={() => newContainerType()}>New ContainerType</button>
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

      {containerTypes.map((containerType) => (
        <ContainerType containerType={containerType} />
      ))}
    </>
  );
}

export default ContainerTypesPage;

