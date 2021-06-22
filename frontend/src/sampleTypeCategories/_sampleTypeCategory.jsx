import React from 'react';

import '../App.css';

const SampleTypeCategory = ({ sampleTypeCategory }) => {
  return (
    <div className="flex flex-row" key={sampleTypeCategory.id}>
      <div className="flex-col-1">
        <a href={`/sample_type_categories/${sampleTypeCategory.id}`}>{sampleTypeCategory.name}</a>
      </div>
      <div className="flex-col-2">
        {sampleTypeCategory.description}
      </div>
      <div className="flex-col-2">
      </div>
    </div>
  );
}

export default SampleTypeCategory;

