import React, { useEffect, useState } from 'react';
import PlanetsContext from './contexts/PlanetsContext';
import './App.css';
import Table from './components/Table';

const STARWAR_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json'; // Teste Local

function App() {
  const [fetchSuccess, setFetchSuccess] = useState({});
  const [fetchError, setFetchError] = useState('');
  const [isFetching, setisFetching] = useState(true);

  function fetchAPI() {
    const fetchPlanets = () => {
      setisFetching(true); // Implemtar depois no DOM
      return fetch(STARWAR_PLANETS)
        .then((response) => response.json()
          .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
    };
    setisFetching(false); // Implemtar depois no DOM
    fetchPlanets().then((success) => setFetchSuccess(success))
      .catch((error) => setFetchError(error));
  }

  useEffect(fetchAPI, []); // Faz o fetch para API

  const context = {
    fetchSuccess,
    fetchError,
    isFetching,
  };

  return (
    <div>
      <PlanetsContext.Provider value={ context }>
        <Table />
      </PlanetsContext.Provider>
    </div>
  );
}

export default App;
