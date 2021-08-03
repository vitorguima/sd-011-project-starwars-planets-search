import React, { useEffect, useState } from 'react';
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
  }, [name, data, setList]);
  return (
    <AppContext.Provider value={ { data, setData, list, setList, setName } }>
      <h1>Star Wars Planets</h1>
      <Search />
      <SearchByNumber />
      <Table />
    </AppContext.Provider>
  );
}

export default App;
