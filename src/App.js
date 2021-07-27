import React, { useEffect, useState } from 'react';
import './App.css';
import Filter from './Filter';
import MyContext from './MyContext';
import Table from './Table';

function App() {
  const [initstate, setInitState] = useState({
    data: [],
    newData: [],
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  async function getApi() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    setInitState({
      data: results,
      newData: results,
      filterByNumericValues: [],
    });
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <MyContext.Provider value={ initstate }>
      <Filter initstate={ initstate } setInitState={ setInitState } />
      <Table />
    </MyContext.Provider>
  );
}

export default App;
