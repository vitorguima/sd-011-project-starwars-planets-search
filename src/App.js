import React, { useEffect, useState } from 'react';
import Table from './Table';
import AppContext from './AppContext';
import './App.css';

function App() {
  const [data, setData] = useState(undefined);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((result) => {
        setData(result.results);
      });
  }, []);

  return (
    <AppContext.Provider
      value={ {
        data,
        filters: {
          filterByName: { name: filterByName },
        },
      } }
    >
      <input
        type="text"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ (event) => setFilterByName(event.currentTarget.value) }
      />
      <Table />
    </AppContext.Provider>
  );
}

export default App;
