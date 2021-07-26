import React, { useContext, useEffect } from 'react';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const { setPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      results.forEach((item) => {
        delete item.residents;
      });
      setPlanets(results);
    };

    getPlanets();
  }, [setPlanets]);

  return (
    <Table />
  );
}

export default App;
