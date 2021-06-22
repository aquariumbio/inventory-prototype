import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import Item from "./_item";

const ItemsPage = () => {
  const history = useHistory();
  // default items to empty array
  const [items, setItems] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get items
      const response = await itemsAPI.getItems();
      if (!response) return;

      // success
      setItems(response);
    };

    init();
  }, []);

  const newItem = () => {
    history.push('/items/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        Items
        <span></span>
        <button onClick={() => newItem()}>New Item</button>
      </div>

      <div className="flex flex-title">
        <div className="flex-col-1">
          Name
        </div>
        <div className="flex-col-2">
          Description
        </div>
        <div className="flex-col-1">
          Sample Type
        </div>
        <div className="flex-col-1">
          Composite Sample Type
        </div>
      </div>

      {items.map((item) => (
        <Item item={item} />
      ))}
    </>
  );
}

export default ItemsPage;

