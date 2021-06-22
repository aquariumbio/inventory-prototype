import React from 'react';

import '../App.css';

const ContainerType = ({ containerType }) => {
  return (
    <div className="flex flex-row" key={containerType.id}>
      <div className="flex-col-1">
        <a href={`/container_types/${containerType.id}`}>{containerType.name}</a>
      </div>
      <div className="flex-col-2">
        {containerType.description}
      </div>
      <div className="flex-col-2">
        {containerType.container_class}
      </div>
    </div>
  );
}

export default ContainerType;

