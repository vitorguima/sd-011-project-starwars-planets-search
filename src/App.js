import React, { useEffect, useState } from 'react';
import Table from './Table';
import AppContext from './AppContext';
import NumericFilter from './NumericFilter';
import UsedFilters from './UsedFilters';
import './App.css';
import OrderFilter from './OrderFilter';

function App() {
  const [data, setData] = useState(undefined);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'asc',
  });

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((result) => {
        setData(result.results);
      });
  }, []);

  function addFilter(numericFilter) {
    setFilterByNumericValues([...filterByNumericValues, numericFilter]);
  }

  function removeFilter(column) {
    setFilterByNumericValues(
      filterByNumericValues.filter(
        (numericFilter) => numericFilter.column !== column,
      ),
    );
  }

  return (
    <AppContext.Provider
      value={ {
        data,
        filters: {
          filterByName: { name: filterByName },
          filterByNumericValues,
        },
        order,
      } }
    >
      <input
        type="text"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ (event) => setFilterByName(event.currentTarget.value) }
      />
      <NumericFilter onSubmit={ addFilter } />
      <UsedFilters onRemove={ removeFilter } />
      <OrderFilter onSubmit={ setOrder } />
      <Table />
    </AppContext.Provider>
  );
}

export default App;
