import React, {useState, useEffect, useReducer} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import sampleTypesAPI from "../api/sampleTypesAPI";

// traditional javascript variable
var x = 0

const CompositeSampleTypeForm = () => {
  const history = useHistory();

  const [compositeSampleType, setCompositeSampleType] = useState({
    name: '',
    description: '',
    sample_class: 'sample',
    sample_type_id: 0,
    composite_sample_type_id: 0
  })
  const [compositeSampleTypes, setCompositeSampleTypes] = useState([])
  const [sampleTypes, setSampleTypes] = useState([])
  const [recipeList, setRecipeList] = useState([])
  const [recipeSelects, setRecipeSelects] = useState({})
  // const [x, setX] = useReducer(x => x + 1, 0);

  useEffect(() => {
    const init = async () => {
      // get sample types and composite sample types
      const response1 = await compositeSampleTypesAPI.getCompositeSampleTypes();
      const response2 = await sampleTypesAPI.getSampleTypes();
      if (!response1 || !response2) return;

      // success
      setCompositeSampleTypes(response1);
      setSampleTypes(response2);
    };

    init();
  }, []);

  const handleChange = async (event) => {
    setCompositeSampleType({...compositeSampleType,
      [event.target.name]:event.target.value
    })
  }

  const handleChangeById = async (event) => {
    setRecipeSelects({
      [event.target.id]:event.target.value
    })
  }

  const handleAdd = async (event) => {
    event.preventDefault();

    // await setX() - would need to turn the result into a promise
    x += 1
    setRecipeList([...recipeList, x])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add sampleTypes
    let sample_type_ids = []
    document.querySelectorAll('.sample_type_ids').forEach(function(sel) {
      sample_type_ids.push(sel.options[sel.selectedIndex].value)
    });
    formData.sample_type_ids = sample_type_ids

    // add compositeSampleType
    const response = await compositeSampleTypesAPI.addCompositeSampleType(formData);
    if (!response) return;

    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/composite_sample_types')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/composite_sample_types">CompositeSampleTypes</a>
        <span>></span>
        New CompositeSampleType
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New CompositeSampleType
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={compositeSampleType.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={compositeSampleType.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Fixed / Variable
          </div>
          <div className="flex-col-2">
            <select name="composite_sample_class" value={compositeSampleType.composite_sample_class} onChange={(event) => {handleChange(event)}}>
              <option value="0">Select... &nbsp;</option>
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className={compositeSampleType.composite_sample_class == 'fixed' ? "show" : "hide" }>
          {recipeList.map((recipe) => (
            <div className="flex box-row" id={`div_${recipe}`}>
              <div className="flex-col-1">
                Sample Type {recipe}
              </div>
              <div className="flex-col-2">
                <select className="sample_type_ids" id={`select_${recipe}`} onChange={(event) => {handleChangeById(event)}}>
                  <option value="0">Select... &nbsp;</option>
                    {sampleTypes.map((sampleType) => (
                      <option value={sampleType.id}>{sampleType.name}</option>
                    ))}
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="flex box-row">
            <div className="flex-col-1">
            </div>
            <div className="flex-col-2">
              <button onClick={(event) => handleAdd(event)}>Add Sample Type</button>
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

export default CompositeSampleTypeForm;
