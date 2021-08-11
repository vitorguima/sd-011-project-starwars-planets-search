import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth';

/**
 * Consultei o video do canal "devmentorlive" para refatorar meu codigo.
 * Link: https://www.youtube.com/watch?v=d1r0aK5awWk
 */

import FilterNumericNumbers from './FilterNumericNumbers';
import Datatable from './datatable';

function Table() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();
  const { filterByName: { name } } = filters;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  const { filterByNumericValues } = filters;

  function search(rows) {
    const minusOne = -1;

    if (filterByNumericValues[0]) {
      const results = [];

      filterByNumericValues.forEach((filters) => {
        const { column, value, comparison } = filters;

        switch (comparison) {
        case 'maior que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name) > minusOne
                && parseInt(row[column], 0) > parseInt(value, 0)
          )));
          break;
        case 'menor que':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name) > minusOne
                && parseInt(row[column], 0) < parseInt(value, 0)
          )));
          break;
        case 'igual a':
          results.push(rows.filter((row) => (
            row.name.toLowerCase().indexOf(name) > minusOne
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
      row.name.toLowerCase().indexOf(name) > minusOne
    ));
  }

  const { order } = filters;

  function sortString(dataNA) {
    if (order.sort === 'ASC') {
      return dataNA.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    return dataNA.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  }

  // Ref: https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
  function sortNumber(dataNA) {
    console.log(dataNA);
    if (order.sort === 'ASC') {
      return dataNA.sort((a, b) => (
        a.orbital_period.localeCompare(b.orbital_period, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      ));
    }
    return dataNA.sort((a, b) => b.orbital_period - a.orbital_period);
  }

  // const [buttonClick, setButtonClick] = useState([true, false]);

  function sortData(dataA) {
    if (order.column === 'Name') {
      const DATA = sortString(dataA);

      return DATA;
    }
    const DATA = sortNumber(dataA);

    return DATA;
  }

  const [localSort, setLocalSort] = useState({
    order: {
      column: 'Name',
      sort: 'ASC',
    },
  });

  function sendToGlobalStore() {
    console.log({
      ...filters,
      ...localSort,
    });
    setFilters({
      ...filters,
      ...localSort,
    });
  }

  return (
    <div>
      <input
        type="text"
        value={ name }
        data-testid="name-filter"
        onChange={ (e) => setFilters({
          ...filters,
          filterByName: { name: e.target.value },
        }) }
      />
      <FilterNumericNumbers />
      <select
        data-testid="column-sort"
        onChange={ (e) => setLocalSort({
          order: {
            ...localSort.order,
            column: e.target.value,
          },
        }) }
      >
        <option value="Name">Name</option>
        <option value="orbital_period">Orbital Period</option>
      </select>
      <div
        onChange={ (e) => setLocalSort({
          order: {
            ...localSort.order,
            sort: e.target.id,
          },
        }) }
      >
        <label htmlFor="ASC">
          Crescente
          <input
            type="radio"
            name="sort"
            id="ASC"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC">
          Decrescente
          <input
            type="radio"
            name="sort"
            id="DESC"
            data-testid="column-sort-input-desc"
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ sendToGlobalStore }
      >
        Ordernar
      </button>
      <div>
        <Datatable data={ sortData(search(data)) } />
      </div>
    </div>
  );
}

export default Table;
