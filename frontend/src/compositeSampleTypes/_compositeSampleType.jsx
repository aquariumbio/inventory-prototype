import React from 'react';

import '../App.css';

const CompositeSampleType = ({ compositeSampleType }) => {
  return (
    <div className="flex flex-row" key={compositeSampleType.id}>
      <div className="flex-col-1">
        <a href={`/composite_sample_types/${compositeSampleType.id}`}>{compositeSampleType.name}</a>
      </div>
      <div className="flex-col-2">
        {compositeSampleType.description}
      </div>
      <div className="flex-col-2">
        {compositeSampleType.composite_sample_class}
      </div>
    </div>
  );
}

export default CompositeSampleType;

