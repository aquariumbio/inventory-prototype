import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import containerTypesAPI from "../api/containerTypesAPI";

const ContainerTypeForm = () => {
  const history = useHistory();

  const [containerType, setContainerType] = useState({
    name: '',
    description: '',
    container_class: 'container',
    container_type_id: 0,
    composite_container_type_id: 0
  })

  const handleChange = async (event) => {
    setContainerType({...containerType,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add containerType
    const response = await containerTypesAPI.addContainerType(formData);
    if (!response) return;

    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/container_types')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/container_types">ContainerTypes</a>
        <span>></span>
        New ContainerType
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New ContainerType
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={containerType.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={containerType.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Max Volume
          </div>
          <div className="flex-col-2">
            <input name="max_volume" value={containerType.max_volume} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Single / Collection
          </div>
          <div className="flex-col-2">
            <select name="container_class" value={containerType.container_class} onChange={(event) => {handleChange(event)}}>
              <option value="single">Single</option>
              <option value="collection">Collection</option>
            </select>
          </div>
        </div>

        <div className={containerType.container_class == 'collection' ? "show" : "hide" }>
          <div className="flex box-row">
            <div className="flex-col-1">
              Rows
            </div>
            <div className="flex-col-2">
              <input name="rows" value={containerType.rows} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
            </div>
          </div>

          <div className="flex box-row">
            <div className="flex-col-1">
              Columns
            </div>
            <div className="flex-col-2">
              <input name="columns" value={containerType.columns} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
            </div>
          </div>
        </div>
        
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1 center">
            <button onClick={(event) => handleSubmit(event)}>Submit</button>
          </div>
        </div>
        <div className="plus-8"></div>
      </form>
    </>
  );
}

export default ContainerTypeForm;

