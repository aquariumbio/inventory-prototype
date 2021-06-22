import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import containerTypesAPI from "../api/containerTypesAPI";
import locationsAPI from "../api/locationsAPI";
import containersAPI from "../api/containersAPI";

const ContainerForm = () => {
  const history = useHistory();

  const [container, setContainer] = useState({
    name: '',
    description: '',
    sample_class: 'sample',
    sample_type_id: 0,
    composite_sample_type_id: 0,
    location_id: 0
  })
  const [containerTypes, setContainerTypes] = useState([])
  const [locations, setLocations] = useState([])
  const [containers, setContainers] = useState([])
  const [containerClass, setContainerClass] = useState('')
  const [locationId, setLocationId] = useState(0)
  const [locationSpec, setLocationSpec] = useState('')

  useEffect(() => {
    const init = async () => {
      // get sample types and composite sample types
      const response1 = await containerTypesAPI.getContainerTypes();
      const response2 = await locationsAPI.getLocations();
      const response3 = await containersAPI.getContainers();
      if (!response1 || !response2 || !response3 ) return;

      // success
      setContainerTypes(response1);
      setLocations(response2);
      setContainers(response3);
    };

    init();
  }, []);

  const handleChange = async (event) => {
    setContainer({...container,
      [event.target.name]:event.target.value
    })
  }

  const handleChangeContainer = async (event) => {
    setContainer({...container,
      [event.target.name]:event.target.value
    })

    const target = event.target
    setContainerClass(target.options[target.selectedIndex].getAttribute("containerClass"))
  }

  const handleChangeLocation = async (event) => {
    setContainer({...container,
      [event.target.name]:event.target.value
    })

    const target = event.target
    setLocationId(target.options[target.selectedIndex].value)
    setLocationSpec(target.options[target.selectedIndex].getAttribute("specification"))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add container
    const response = await containersAPI.addContainer(formData);
    if (!response) return;

    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/containers')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/containers">Containers</a>
        <span>></span>
        New Container
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New Container
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={container.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={container.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Container Type
          </div>
          <div className="flex-col-2">
            <select name="container_type_id" value={container.container_type_id} onChange={(event) => {handleChangeContainer(event)}}>
              <option value="0">Select... &nbsp;</option>
              {containerTypes.map((containerType) => (
                <option value={containerType.id} containerClass={containerType.container_class} key={containerType.id}>{containerType.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Container Class
          </div>
          <div className="flex-col-2">
            {containerClass || "-"}
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Location
          </div>
          <div className="flex-col-2">
            <select name="location_id" value={container.location_id} onChange={(event) => {handleChangeLocation(event)}}>
              <option value="0">&lt;None></option>
              {locations.map((location) => (
                <option value={location.id} specification={`${location.spec_labels} ( ${location.spec_sizes} )`} key={location.id}>{location.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={locationId == 0 ? "hide" : "show" }>
          <div className="flex box-row">
            <div className="flex-col-1">
              Location Spec
            </div>
            <div className="flex-col-2">
              {locationSpec || "-"}
            </div>
          </div>

          <div className="flex box-row">
            <div className="flex-col-1">
              Location Detail
            </div>
            <div className="flex-col-2">
              <input name="location" value={container.location} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
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

export default ContainerForm;

