import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import itemsAPI from "../api/itemsAPI";
import sampleTypesAPI from "../api/sampleTypesAPI";
import compositeSampleTypesAPI from "../api/compositeSampleTypesAPI";
import containersAPI from "../api/containersAPI";

const ItemForm = () => {
  const history = useHistory();

  const [item, setItem] = useState({
    sample_class: 'sample'
  })
  const [sampleTypes, setSampleTypes] = useState([])
  const [compositeSampleTypes, setCompositeSampleTypes] = useState([])
  const [containers, setContainers] = useState([])

//   const [sampleClass, setSampleClass] = useState('sample')
  const [containerClass, setContainerClass] = useState('')
  const [compositeClass, setCompositeClass] = useState('')

  useEffect(() => {
    const init = async () => {
      // get sample types and composite sample types
      const response1 = await sampleTypesAPI.getSampleTypes();
      const response2 = await compositeSampleTypesAPI.getCompositeSampleTypes();
      const response3 = await containersAPI.getContainers();
      if (!response1 || !response2 || !response3 ) return;

      // success
      setSampleTypes(response1);
      setCompositeSampleTypes(response2);
      setContainers(response3);
    };

    init();
  }, []);

  const handleChange = async (event) => {
    setItem({...item,
      [event.target.name]:event.target.value
    })
  }

  const handleChangeContainer = async (event) => {
    setItem({...item,
      [event.target.name]:event.target.value
    })

    const target = event.target
    setContainerClass(target.options[target.selectedIndex].getAttribute("containerClass"))
  }

  const handleChangeComposite = async (event) => {
    setItem({...item,
      [event.target.name]:event.target.value
    })

    const target = event.target
    setCompositeClass(target.options[target.selectedIndex].getAttribute("compositeClass"))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // get form data
    const form = document.querySelector('form[name="new"]');
    const data = new FormData(form);
    const formData = Object.fromEntries(data);

    // add item
    const response = await itemsAPI.addItem(formData);
    if (!response) return;

    // form errors
    if (response.errors) {
      alert('Errors\n- '+response.errors.join('\n- '))
      return;
    }
    // success
    history.push('/items')
  }

  return (
    <>
      <div className='breadcrumbs'>
        <a href="/items">Items</a>
        <span>></span>
        New Item
      </div>

      <form name="new" className="box width-box">
        <div className="flex box-title">
          <div className="flex-col-1">
            New Item
          </div>
        </div>
        <div className="plus-8"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Name
          </div>
          <div className="flex-col-2">
            <input name="name" value={item.name} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Description
          </div>
          <div className="flex-col-2">
            <input name="description" value={item.description} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
          </div>
        </div>
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Sample Class
          </div>
          <div className="flex-col-2">
            <select name="sample_class" value={item.sample_class} onChange={(event) => {handleChange(event)}}>
              <option value="sample">Sample</option>
              <option value="composite_sample">Composite Sample</option>
            </select>
          </div>
        </div>

        {item.sample_class == 'sample' ? (
          <div className="flex box-row">
            <div className="flex-col-1">
              Sample Type
            </div>
            <div className="flex-col-2">
              <select name="sample_type_id" value={item.sample_type_id} onChange={(event) => {handleChange(event)}}>
                <option value="0">Select... &nbsp;</option>
                {sampleTypes.map((sampleType) => (
                  <option value={sampleType.id} key={sampleType.id}>{sampleType.name}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            <div className="flex box-row">
              <div className="flex-col-1">
                Composite Sample Type
              </div>
              <div className="flex-col-2">
                <select name="composite_sample_type_id" value={item.composite_sample_type_id} onChange={(event) => {handleChangeComposite(event)}}>
                  <option value="0">Select... &nbsp;</option>
                  {compositeSampleTypes.map((compositeSampleType) => (
                    <option value={compositeSampleType.id} compositeClass={compositeSampleType.composite_sample_class} key={compositeSampleType.id}>{compositeSampleType.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex box-row">
              <div className="flex-col-1">
                Composite Sample Class
              </div>
              <div className="flex-col-2">
                {compositeClass || '-'}
              </div>
            </div>
          </>
        )}
        
        <div className="divider"></div>

        <div className="flex box-row">
          <div className="flex-col-1">
            Container
          </div>
          <div className="flex-col-2">
            <select name="container_id" value={item.container_id} onChange={(event) => {handleChangeContainer(event)}}>
              <option value="0">Select... &nbsp;</option>
              {containers.map((container) => (
                <option value={container.id} containerClass={container.container_class} key={container.id}>{container.name}</option>
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

        <div className={containerClass == 'collection' ? "show" : "hide" }>
          <div className="flex box-row">
            <div className="flex-col-1">
              Row
            </div>
            <div className="flex-col-2">
              <input name="container_row" value={item.container_row} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
            </div>
          </div>

          <div className="flex box-row">
            <div className="flex-col-1">
              Column
            </div>
            <div className="flex-col-2">
              <input name="container_column" value={item.container_column} autoComplete = "off" onChange={(event) => {handleChange(event)}} />
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

export default ItemForm;

