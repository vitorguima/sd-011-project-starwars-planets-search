import React, { useEffect, useState, useCallback } from 'react';
import AppContext from './Context';
import Table from './Components/Table';
import Search from './Components/Search';
import SearchByNumber from './Components/SearchByNumber';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [list, setList] = useState();
  useEffect(() => {
    async function planets() {
      const planetList = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetJSON = await planetList.json();
      setData(planetJSON.results);
      setList(planetJSON.results);
    }
    planets();
  }, []);

  const filterFunc = useCallback(
    ({ column, comparison, value }) => {
      const updateList = data.reduce((acc, cur) => {
        const curValue = parseInt(cur[column], 10);
        const filterValue = parseInt(value, 10);
        switch (comparison) {
        case 'maior que':
          return (curValue > filterValue) ? [...acc, cur] : acc;
        case 'menor que':
          return (curValue < filterValue) ? [...acc, cur] : acc;
        case 'igual a':
          return (curValue === filterValue) ? [...acc, cur] : acc;
        default:
          return [...acc, cur];
        }
      }, []);
      setList(updateList);
    },
    [data],
  );

  const [filters, setFilter] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    if (data) {
      setList(data.reduce((acc, cur) => {
        if (cur.name.includes(name)) {
          return [...acc, cur];
        }
        return acc;
      }, []));
    }
    if (filters.length !== 0) {
      filters.map((element) => filterFunc(element));
    }
  }, [name, data, setList, filters, filterFunc]);

  return (
    <AppContext.Provider
      value={ { data, setData, list, setList, setName, setFilter, filters } }
    >
      <h1>Star Wars Planets</h1>
      <Search />
      <SearchByNumber />
      <Table />
    </AppContext.Provider>
  );
}

export default App;
