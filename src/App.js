import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Context from './context/Context';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');

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

  function handlePlanetFiltered({ target: { value } }) {
    setFilterByName(value);
  }
  const filteredPlanets = planets.filter((item) => item.name.includes(filterByName));
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handlePlanetFiltered }
        value={ filterByName }
      />
      <Context.Provider
        value={ {
          data: filteredPlanets,
          filters: {
            filterByName: {
              name: filterByName,
            },
          },
        } }
      >
        { filteredPlanets.length && <Table /> }
      </Context.Provider>
    </div>
  );
}

export default App;
