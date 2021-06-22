import React from 'react';

import '../App.css';

const Location = ({ location }) => {
  return (
    <div className="flex flex-row" key={location.id}>
      <div className="flex-col-1">
        <a href={`/locations/${location.id}`}>{location.name}</a>
      </div>
      <div className="flex-col-2">
        {location.description}
      </div>
      <div className="flex-col-2">
        {location.spec_labels}
        &nbsp;
        ( {location.spec_sizes} )
      </div>
    </div>
  );
}

export default Location;

