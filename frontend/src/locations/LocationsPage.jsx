import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import locationsAPI from "../api/locationsAPI";
import Location from "./_location";

const LocationsPage = () => {
  const history = useHistory();
  // default locations to empty array
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get locations
      const response = await locationsAPI.getLocations();
      if (!response) return;

      // success
      setLocations(response);
    };

    init();
  }, []);

  const newLocation = () => {
    history.push('/locations/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        Locations
        <span></span>
        <button onClick={() => newLocation()}>New Location</button>
      </div>

      <div className="flex flex-title">
        <div className="flex-col-1">
          Name
        </div>
        <div className="flex-col-2">
          Description
        </div>
        <div className="flex-col-2">
          Specification
        </div>
      </div>

      {locations.map((location) => (
        <Location location={location} />
      ))}
    </>
  );
}

export default LocationsPage;

