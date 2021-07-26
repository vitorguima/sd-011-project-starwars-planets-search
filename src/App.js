import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/PlanetsContext';

function App() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setPlanets(results);
      setLoading(false);
    };

    getPlanets();
  }, []);

  const data = {
    planets,
    setPlanets,
    loading,
  };

  return (
    <PlanetsContext.Provider value={ data }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
