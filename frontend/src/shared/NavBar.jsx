import React from 'react';

import '../App.css';

const NavBar = () => {
  return (
    <>
      <div className='breadcrumbs center'>
        <a href="/sample_type_categories">Sample Type Categories</a>
        <span></span>
        <a href="/sample_types">Sample Types</a>
        <span></span>
        <a href="/composite_sample_types">Composite Sample Types</a>
        <span></span>
        <a href="/locations">Locations</a>
        <span></span>
        <a href="/container_types">Container Types</a>
        <span></span>
        <a href="/containers">Containers</a>
        <span></span>
        <a href="/items">Items</a>
      </div>
    </>
  );
}

export default NavBar;

//         <a href="/samples">Samples</a>
//         <span></span>
