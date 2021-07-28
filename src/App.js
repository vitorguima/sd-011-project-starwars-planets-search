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
    updateFilter: false,
    colunFilter: ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    comparisonFilter: ['maior que', 'menor que', 'igual a'],
    filterByNumericValues: [],
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  async function getApi() {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    const sortArray = results.sort((a, b) => a.name.localeCompare(b.name));
    setInitState({
      data: sortArray,
      newData: sortArray,
      updateFilter: false,
      colunFilter: ['population',
        'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
      comparisonFilter: ['maior que', 'menor que', 'igual a'],
      filterByNumericValues: [],
      order: {
        column: 'population',
        sort: 'ASC',
      },
    });
  }

  useEffect(() => {
    getApi();
  }, []);

  return (
    <MyContext.Provider value={ initstate }>
      <Filter initstate={ initstate } setInitState={ setInitState } />
      <Table initstate={ initstate } setInitState={ setInitState } />
    </MyContext.Provider>
  );
}

export default App;
