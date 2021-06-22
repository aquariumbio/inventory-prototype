import React from 'react';

import '../App.css';

const Item = ({ item }) => {
  return (
    <div className="flex flex-row" key={item.id}>
      <div className="flex-col-1">
        <a href={`/items/${item.id}`}>{item.name}</a>
      </div>
      <div className="flex-col-2">
        {item.description}
      </div>
      <div className="flex-col-1">
        {item.sample_type ? (
          <>
            {item.sample_type} ({item.sample_category})
          </>
        ) : (
          <>
            -
          </>
        )}
      </div>
      <div className="flex-col-1">
        {item.composite_sample_type ? (
          <>
            {item.composite_sample_type} ({item.composite_sample_class})
          </>
        ) : (
          <>
            -
          </>
        )}
      </div>
    </div>
  );
}

export default Item;

