import React, { useContext, useEffect } from 'react';

import Form from '../components/Form';
import Table from '../components/Table';

import PlanetsContext from '../context/PlanetsContext';
import fecthApi from '../services/fetchPlanets';

function Home() {
  const { setPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    fecthApi().then((response) => setPlanets(response.results));
  });

  return (
    <div>
      <Form />
      <Table />
    </div>
  );
}

export default Home;
