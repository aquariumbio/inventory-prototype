import React, {useState, useEffect} from 'react';

import '../App.css';
import containersAPI from "../api/containersAPI";
import Container from "./_container";

const ContainerPage = ({match}) => {
  // default members to empty array
  const containerId = match.params.id
  const [container, setContainer] = useState({});

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await containersAPI.getContainer(containerId);
      if (!response) return;

      // success
      setContainer(response);
    };

    init();
  }, []);

  const editContainer = () => {
    alert('TODO: Edit Container')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/containers">Containers</a>
        <span>></span>
        {container.name}
        <span>></span>
        <button onClick={() => editContainer()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {container.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {container.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {container.description}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Container Type
          </div>
          <div className="flex-col-2">
            {container.container_name} ( {container.container_class} )
          </div>
        </div>

        {container.container_class == 'collection' ? (
          <div className="flex box-row">
            <div className="flex-col-1">
              Row / column
            </div>
            <div className="flex-col-2">
              {container.row} / {container.column}
            </div>
          </div>
        ) : (
          <>
          </>
        )}

        <div className="flex box-row">
          <div className="flex-col-1">
            Location Name
          </div>
          <div className="flex-col-2">
            {container.location_name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Location
          </div>
          <div className="flex-col-2">
            {container.location}
          </div>
        </div>

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default ContainerPage;
