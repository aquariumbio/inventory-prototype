import React from 'react';

import '../App.css';

const SampleType = ({ sampleType }) => {
  return (
    <div className="flex flex-row" key={sampleType.id}>
      <div className="flex-col-1">
        <a href={`/sample_types/${sampleType.id}`}>{sampleType.name}</a>
      </div>
      <div className="flex-col-2">
        {sampleType.description}
      </div>
      <div className="flex-col-2">
        {sampleType.category}
      </div>
    </div>
  );
}

export default SampleType;

