import React, { useEffect, useState } from 'react';
import Table from './Table';
import { useAuth } from '../Providers/Auth';
import FilterByNumber from './FilterByNumber';

function PlanetsProvider() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  function filteredData(rows) {
    const { filterByName: { name } } = filters;
    const { filterByNumericValues } = filters;
    const minusOne = -1;
    console.log(filterByNumericValues);
    if (filterByNumericValues.length > 0) {
      const { column, comparison, value } = filterByNumericValues[0];
      switch (comparison) {
      case 'maior que':
        return rows.filter((row) => (
          row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) > parseInt(value, 0)
        ));
      case 'menor que':
        return rows.filter((row) => (
          row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) < parseInt(value, 0)
        ));
      case 'igual a':
        return rows.filter((row) => (
          row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) === parseInt(value, 0)
        ));
      default:
      }
    }
    return rows.filter((row) => (
      row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
    ));
  }

  return (
    <div>
      <label htmlFor="name-filter">
        Pesquisar Planeta:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setFilters({
            ...filters,
            filterByName: {
              name: e.target.value,
            },
          }) }
        />
      </label>
      <FilterByNumber />
      <Table dataForTable={ filteredData(data) } />
    </div>
  );
}

export default PlanetsProvider;
