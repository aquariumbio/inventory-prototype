import React, {useState, useEffect} from 'react';

import '../App.css';
import locationsAPI from "../api/locationsAPI";
import Location from "./_location";

const LocationPage = ({match}) => {
  // default members to empty array
  const locationId = match.params.id
  const [location, setLocation] = useState({});

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await locationsAPI.getLocation(locationId);
      if (!response) return;

      // success
      setLocation(response);
    };

    init();
  }, []);

  const editLocation = () => {
    alert('TODO: Edit Location')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/locations">Locations</a>
        <span>></span>
        {location.name}
        <span>></span>
        <button onClick={() => editLocation()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {location.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {location.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {location.description}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Labels
          </div>
          <div className="flex-col-2">
            {location.spec_labels}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Sizes
          </div>
          <div className="flex-col-2">
            {location.spec_sizes}
          </div>
        </div>

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default LocationPage;
