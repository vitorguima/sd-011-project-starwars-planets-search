import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Context from './context/Context';

function App() {
  const [planets, setPlanets] = useState([]);

  // didMount
  useEffect(() => {
    const getPlanet = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint).then((results) => results.json());
      // console.log(data.results);
      setPlanets(data.results);
    };

    getPlanet();
  }, []);
  return (
    <Context.Provider value={ planets }>
      { planets.length && <Table /> }
    </Context.Provider>
  );
}

export default App;
