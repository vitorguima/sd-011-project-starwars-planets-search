import React, { useEffect, useState } from 'react';
import Table from './Table';
import PlanetsContext from './PlanetsContext';
import './App.css';

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((result) => {
        setData(result.results);
      });
  }, []);

  return (
    <PlanetsContext.Provider value={ { data } }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
