import React, { useContext, useEffect } from 'react';

import Form from '../components/Form';
import Table from '../components/Table';

import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const { setPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((r) => r.json())
      .then((json) => {
        setPlanets(json.results);
      });
  }, [setPlanets]);

  return (
    <div>
      <Form />
      <Table />
    </div>
  );
}

export default Home;
