import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import sampleTypeCategoriesAPI from "../api/sampleTypeCategoriesAPI";
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import sampleTypesAPI from "../api/sampleTypesAPI";

const SampleTypeForm = () => {
  const history = useHistory();

  const [sampleType, setSampleType] = useState({
    name: '',
    description: '',
    sample_class: 'sample',
    sample_type_id: 0,
    composite_sample_type_id: 0
  })
  const [sampleTypeCategories, setSampleTypeCategories] = useState([])
  const [sampleTypes, setSampleTypes] = useState([])

  useEffect(() => {
    const init = async () => {
      // get sample types and composite sample types
      const response1 = await sampleTypesAPI.getSampleTypes();
      const response3 = await sampleTypeCategoriesAPI.getSampleTypeCategories();
      if (!response1 || !response3 ) return;

      // success
      setSampleTypes(response1);
      setSampleTypeCategories(response3);
    };

    init();
  }, []);

  const handleChange = async (event) => {
    setSampleType({...sampleType,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add sampleType
    const response = await sampleTypesAPI.addSampleType(formData);
    if (!response) return;

    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/sample_types')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/sampleTypes">SampleTypes</a>
        <span>></span>
        New SampleType
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New SampleType
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={sampleType.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={sampleType.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Sample Type Category
          </div>
          <div className="flex-col-2">
            <select name="sample_type_category_id" value={sampleType.sample_type_category_id} onChange={(event) => {handleChange(event)}}>
              <option value="0">Select... &nbsp;</option>
              {sampleTypeCategories.map((sampleTypeCategory) => (
                <option value={sampleTypeCategory.id} key={sampleTypeCategory.id}>{sampleTypeCategory.name}</option>
              ))}
            </select>
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

export default SampleTypeForm;
