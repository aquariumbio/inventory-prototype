import React, {useState, useEffect} from 'react';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import Item from "./_item";

const ItemPage = ({match}) => {
  // default members to empty array
  const itemId = match.params.id
  const [item, setItem] = useState({});

  useEffect(() => {
    const init = async () => {
      // get members
      const response = await itemsAPI.getItem(itemId);
      if (!response) return;

      // success
      setItem(response);
    };

    init();
  }, []);

  const editItem = () => {
    alert('TODO: Edit Item')
  }

  return (
    <>
      <div class='breadcrumbs'>
        <a href="/items">Items</a>
        <span>></span>
        {item.name}
        <span>></span>
        <button onClick={() => editItem()}>Edit</button>
      </div>

      <div className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            {item.name}
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            {item.name}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            {item.description}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Type
          </div>
          <div className="flex-col-2">
            {item.sample_class}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Sample Type
          </div>
          <div className="flex-col-2">
            {item.sample_type_id}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Composite Sample Type
          </div>
          <div className="flex-col-2">
            {item.composite_sample_type_id}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Container
          </div>
          <div className="flex-col-2">
            {item.container_id}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Row
          </div>
          <div className="flex-col-2">
            {item.container_row}
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Column
          </div>
          <div className="flex-col-2">
            {item.container_column}
          </div>
        </div>

        <div className="plus-8"></div>
      </div>
    </>
  );
}

export default ItemPage;

