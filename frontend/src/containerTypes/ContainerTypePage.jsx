import React, {useState, useEffect} from 'react';

import '../App.css';
import containerTypesAPI from "../api/containerTypesAPI";
import ContainerType from "./_containerType";

const ContainerTypePage = ({match}) => {
  // default members to empty array
  const containerTypeId = match.params.id
  const [containerType, setContainerType] = useState({});

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await containerTypesAPI.getContainerType(containerTypeId);
      if (!response) return;

      // success
      setContainerType(response);
    };

    init();
  }, []);

  const editContainerType = () => {
    alert('TODO: Edit ContainerType')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/container_types">ContainerTypes</a>
        <span>></span>
        {containerType.name}
        <span>></span>
        <button onClick={() => editContainerType()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {containerType.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {containerType.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {containerType.description}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Class
          </div>
          <div className="flex-col-2">
            {containerType.container_class}
          </div>
        </div>

        {containerType.container_class == 'collection' ? (
          <>
            <div className="flex box-row">
              <div className="flex-col-1">
                Rows
              </div>
              <div className="flex-col-2">
                {containerType.rows}
              </div>
            </div>
            <div className="flex box-row">
              <div className="flex-col-1">
                Columns
              </div>
              <div className="flex-col-2">
                {containerType.columns}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default ContainerTypePage;
