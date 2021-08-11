import React, { useEffect, useState } from 'react';
import Table from './Table';
import { useAuth } from '../Providers/Auth';
import FilterByNumber from './FilterByNumber';

function PlanetsProvider() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();
  const { filterByNumericValues } = filters;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  function filteredData(rows) {
    const { filterByName: { name } } = filters;
    const results = [];
    const minusOne = -1;

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;

        switch (comparison) {
        case 'maior que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) > parseInt(value, 0)
          )));
          break;
        case 'menor que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) < parseInt(value, 0)
          )));
          break;
        case 'igual a':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
          && parseInt(row[column], 0) === parseInt(value, 0)
          )));
          break;
        default:
        }
      });

      if (results[0] && results[1]) {
        const finalFilter = results[0].filter((planet) => (
          results[1].includes(planet)
        ));
        return finalFilter;
      }
      return results[0];
    }
    return rows.filter((row) => (
      row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
    ));
  }

  const delFilter = () => {
    const savedFilters = filterByNumericValues;
    savedFilters.shift();
    setFilters({
      ...filters,
      filterByNumericValues: savedFilters,
    });
  };

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
      {/* Requisito 5 desenvolvido em parceiria com Gabriel Carvalho e Pedro Oliveira */}
      { filterByNumericValues.length > 0
      && (
        filterByNumericValues.map((value, index) => (
          <div data-testid="filter" key={ index }>
            <span>{ `${value.column} ` }</span>
            <span>{ `${value.comparison} ` }</span>
            <span>{ `${value.value} ` }</span>
            <button
              onClick={ delFilter }
              type="button"
            >
              X
            </button>
          </div>
        ))
      )}
      <Table dataForTable={ filteredData(data) } />
    </div>
  );
}

export default PlanetsProvider;
