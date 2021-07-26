import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Context from './context/Context';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByFirstDropdown, setFirstDropdown] = useState('population');
  const [filterBysecondDropdown, setSecondDropdown] = useState('maior que');
  const [filterByNumber, setFilterByNumber] = useState(null);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  // didMount
  useEffect(() => {
    const getPlanet = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint).then((results) => results.json());
      // console.log(data.results);
      setPlanets(data.results);
      setFilteredPlanets(data.results);
    };

    getPlanet();
  }, []);

  function handlePlanetFilteredByName({ target: { value } }) {
    setFilterByName(value);
    const newFilter = planets.filter((item) => item.name.includes(value));
    setFilteredPlanets(newFilter);
  }

  function handleFirstDropdown({ target: { value } }) {
    setFirstDropdown(value);
  }

  function handleSecondDropDown({ target: { value } }) {
    setSecondDropdown(value);
  }

  function handleFilterByNumber({ target: { value } }) {
    setFilterByNumber(parseInt(value, 10));
  }

  function handleButtonFilter() {
    let newFilter;
    if (filterBysecondDropdown === 'maior que') {
      newFilter = planets.filter((item) => parseInt(item[filterByFirstDropdown], 10)
       > filterByNumber);
    } else if (filterBysecondDropdown === 'menor que') {
      newFilter = planets.filter((item) => parseInt(item[filterByFirstDropdown], 10)
        < filterByNumber);
    } else if (filterBysecondDropdown === 'igual a') {
      newFilter = planets.filter((item) => parseInt(item[filterByFirstDropdown], 10)
       === filterByNumber);
    }
    setFilteredPlanets(newFilter);
  }

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handlePlanetFilteredByName }
        value={ filterByName }
      />

      <select
        data-testid="column-filter"
        onChange={ handleFirstDropdown }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ handleSecondDropDown }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleFilterByNumber }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButtonFilter }
      >
        Aplicar filtro
      </button>
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
