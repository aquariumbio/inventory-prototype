import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import sampleTypesAPI from "../api/sampleTypesAPI";
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import sampleTypeCategoriesAPI from "../api/sampleTypeCategoriesAPI";

const SampleTypeCategoryForm = () => {
  const history = useHistory();

  const [sampleTypeCategory, setSampleTypeCategory] = useState({
    name: '',
    description: '',
    sample_class: 'sample',
    sample_type_id: 0,
    composite_sample_type_id: 0
  })

  const handleChange = async (event) => {
    setSampleTypeCategory({...sampleTypeCategory,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add sampleTypeCategory
    const response = await sampleTypeCategoriesAPI.addSampleTypeCategory(formData);
    if (!response) return;

    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/sample_type_categories')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/sample_type_categories">SampleTypeCategories</a>
        <span>></span>
        New SampleTypeCategory
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New SampleTypeCategory
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={sampleTypeCategory.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={sampleTypeCategory.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
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

export default SampleTypeCategoryForm;

