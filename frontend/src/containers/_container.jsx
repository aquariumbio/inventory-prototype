import React from 'react';

import '../App.css';

const Container = ({ container }) => {
  return (
    <div className="flex flex-row" key={container.id}>
      <div className="flex-col-1">
        <a href={`/containers/${container.id}`}>{container.name}</a>
      </div>
      <div className="flex-col-2">
        {container.description}
      </div>
      <div className="flex-col-2">
        {container.container_name} ({container.container_class})
      </div>
    </div>
  );
}

export default Container;

