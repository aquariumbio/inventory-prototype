import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import '../App.css';
import containersAPI from "../api/containersAPI";
import Container from "./_container";

const ContainersPage = () => {
  const history = useHistory();
  // default containers to empty array
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const init = async () => {
      // get containers
      const response = await containersAPI.getContainers();
      if (!response) return;

      // success
      setContainers(response);
    };

    init();
  }, []);

  const newContainer = () => {
    history.push('/containers/new')
  }

  return (
    <>
      <div class='breadcrumbs'>
        Containers
        <span></span>
        <button onClick={() => newContainer()}>New Container</button>
      </div>

      <div className="flex flex-title">
        <div className="flex-col-1">
          Name
        </div>
        <div className="flex-col-2">
          Description
        </div>
        <div className="flex-col-2">
          Container Type
        </div>
      </div>

      {containers.map((container) => (
        <Container container={container} />
      ))}
    </>
  );
}

export default ContainersPage;

