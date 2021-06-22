import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import sampleTypesAPI from "../api/sampleTypesAPI";
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import locationsAPI from "../api/locationsAPI";

// traditional javascript variable
var x = 0

const LocationForm = () => {
  const history = useHistory();

  const [location, setLocation] = useState({
    name: '',
    description: '',
    sample_class: 'sample',
    sample_type_id: 0,
    composite_sample_type_id: 0
  })
  const [locations, setLocations] = useState([])
  const [labelList, setLabelList] = useState([])
  const [labelInputs, setLabelInputs] = useState({})
  const [sizeInputs, setSizeInputs] = useState({})

  useEffect(() => {
    const init = async () => {
      // get sample types and composite sample types
      const response3 = await locationsAPI.getLocations();
      if (!response3 ) return;

      // success
      setLocations(response3);
    };

    init();
  }, []);

  const handleChange = async (event) => {
    setLocation({...location,
      [event.target.name]:event.target.value
    })
  }

  const handleAdd = async (event) => {
    event.preventDefault();

    // await setX() - would need to turn the result into a promise
    x += 1
    setLabelList([...labelList, x])
  }

  const handleLabelById = async (event) => {
    setLabelInputs({...labelInputs,
      [event.target.id]:event.target.value
    })
  }
  
  const handleSizeById = async (event) => {
    setSizeInputs({...sizeInputs, 
      [event.target.id]:event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add specification
    let labels = []
    let sizes = []
    document.querySelectorAll('.labels').forEach(function(l) {
      labels.push(l.value)
    });
    document.querySelectorAll('.sizes').forEach(function(s) {
      sizes.push(s.value)
    });
    formData.labels = labels
    formData.sizes = sizes

    // add location
    const response = await locationsAPI.addLocation(formData);
    if (!response) return;


    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/locations')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/locations">Locations</a>
        <span>></span>
        New Location
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New Location
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={location.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={location.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Levels
          </div>
          <div className="flex-col-2">
          </div>
        </div>
        
        {labelList.map((loc) => (
          <div className="flex box-row" id={`div_${loc}`}>
            <div className="flex-col-1">
              &nbsp; &bull; Label / Size
            </div>
            <div className="flex-col-1">
              <input className="labels" placeholder="Label" id={`label_${loc}`} onChange={(event) => {handleLabelById(event)}} />
            </div>
            <div className="flex-col-1">
              <input className="sizes" placeholder="1" id={`size_${loc}`} onChange={(event) => {handleSizeById(event)}} />
            </div>
          </div>
        ))}

        <div className="flex box-row">
          <div className="flex-col-1">
          </div>
          <div className="flex-col-2">
            <button onClick={(event) => handleAdd(event)}>Add Level</button>
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
export default LocationForm;
