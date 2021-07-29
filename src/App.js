import React, { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from './contexts/PlanetsContext.js';
import './App.css';
import Table from './components/Table';

const STARWAR_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json'; // Teste Local

function App() {

const [fetchSuccess, setFetchSuccess] = useState({});
const [fetchError, setFetchError] = useState('');
const [isFetching, setisFetching]= useState(true);


useEffect(fetchAPI, []);

useEffect(() => {
  console.log('data do provider após query à API:')
  console.log(fetchSuccess);
  console.log('error do provider após query à API:')
  console.log(fetchError);
});

function fetchAPI() {
  const fetchPlanets = async () => {
    setisFetching(true); // teste
   return await fetch(STARWAR_PLANETS)
    .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    )
  }
  setisFetching(false);
  fetchPlanets().then((success) => setFetchSuccess(success))
  .catch((error) => setFetchError(error));
}


const context = {
  fetchSuccess,
  isFetching,
}

  return (
    <div>
      <PlanetsContext.Provider value={context}>
      <Table />
      </PlanetsContext.Provider>
    </div>
  );
}

export default App;
