import React, { useEffect, useState } from 'react';
import './App.css';
import MyContext from './components/MyContext';
import Table from './components/Table';
import getPlanets from './data';

function App() {
  const [planets, setPlanets] = useState();
  const [search, setSearch] = useState();
  const [value, setValue] = useState(0);
  const [comparison, setComparison] = useState('maior que');
  const [column, setColumn] = useState('population');
  const [planetList, setList] = useState();

  useEffect(() => {
    const getPlanetsList = async () => {
      const planetsList = await getPlanets();
      const list = planetsList.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setList(list);
      setPlanets(list);
    };
    getPlanetsList();
  }, []);

  useEffect(() => {
    if (planets) {
      const list = planets.filter((planet) => (
        planet.name.toLowerCase().includes(search.toLowerCase())
      ));
      setList(list);
    }
  }, [search]);

  const contextValue = {
    planets: planetList,
    filters: {
      filterByName: {
        name: search,
      },
      filterByNumericValue: [
      ],
    },
  };

  const filterColumn = () => {
    const newValue = Number.parseFloat(value);
    const list = planets.filter((planet) => {
      const info = Number.parseFloat(planet[column]);
      if (comparison === 'maior que') {
        return info > newValue;
      }
      if (comparison === 'menor que') {
        return info < newValue;
      }
      if (comparison === 'igual a') {
        return info === newValue;
      }
      return null;
    });
    contextValue.filters.filterByNumericValue.push({
      column,
      comparison,
      value,
    });
    setList(list);
  };

  return (
    <MyContext.Provider value={ contextValue }>
      <input
        data-testid="name-filter"
        type="text"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterColumn }
      >
        Filtre
      </button>
      <Table />
    </MyContext.Provider>
  );
}

export default App;
