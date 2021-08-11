import React, { useContext, useState, useEffect } from 'react';
import TablePlanetsContext from '../contexts/TablePlanetsContext';
import Table from './Table';
import FilterByNumber from './FilterByNumber';

export default function TableFiltered() {
  const { filter, setFilter } = useContext(TablePlanetsContext);
  const [planets, setPlanets] = useState([]);

  const handleChange = (value) => {
    setFilter({
      ...filter,
      filterByName: {
        name: value.toUpperCase(),
      },
    });
  };

  const [localFilter, setlocalFilter] = useState({
    order: {
      column: 'Name',
      sort: 'ASC',
    },
  });

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((result) => { setPlanets(result.results); });
  }, []);

  function search(rows) {
    const minusOne = -1;

    if (filter.filterbyNumericValues[0]) {
      const results = [];

      filter.filterbyNumericValues.forEach((filters) => {
        const { column, value, comparison } = filters;

        switch (comparison) {
        case 'maior que':
          results.push(rows.filter((row) => (
            row.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
              && parseInt(row[column], 0) > parseInt(value, 0)
          )));
          break;
        case 'menor que':
          results.push(rows.filter((row) => (
            row.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
              && parseInt(row[column], 0) < parseInt(value, 0)
          )));
          break;
        case 'igual a':
          results.push(rows.filter((row) => (
            row.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
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
      row.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
    ));
  }

  const sortString = (string) => {
    const MENOS_UM = -1;
    if (filter.order.sort === 'ASC') {
      return string.sort((firstElement, secondElement) => {
        if (firstElement.name < secondElement.name) {
          return MENOS_UM;
        }
        if (firstElement.name > secondElement.name) {
          return 1;
        }
        return 0;
      });
    }

    return string.sort((firstElement, secondElement) => {
      if (firstElement.name < secondElement.name) {
        return 1;
      }
      if (firstElement.name > secondElement.name) {
        return MENOS_UM;
      }
      return 0;
    });
  };

  const sortNum = (array) => {
    if (filter.order.sort === 'ASC') {
      return array.sort((firstElem, secondElem) => (
        firstElem.orbital_period.localeCompare(secondElem.orbital_period, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      ));
    }
    return array.sort((firstElemen, secondElem) => secondElem
      .orbital_period - firstElemen.orbital_period);
  };

  const sortResults = (result) => {
    if (filter.order.column === 'Name') {
      const finalResult = sortString(result);
      return finalResult;
    }
    const finalResult = sortNum(result);
    return finalResult;
  };

  const removeFilter = () => {
    const savedFilters = filter.filterbyNumericValues;
    savedFilters.shift();
    setFilter({
      ...filter,
      filterbyNumericValues: savedFilters,
    });
  };

  return (
    <div>
      <label htmlFor="filtered-input">
        <input
          id="filtered-input"
          type="text"
          onChange={ (event) => handleChange(event.target.value) }
          data-testid="name-filter"
        />
      </label>
      <FilterByNumber />
      <select
        data-testid="column-sort"
        onChange={ (e) => setlocalFilter({
          order: {
            ...localFilter.order,
            column: e.target.value,
          },
        }) }
      >
        <option value="name">Name</option>
        <option value="orbital_period">Orbital Period</option>
      </select>
      <main
        onChange={ (e) => setlocalFilter({
          order: {
            ...localFilter.order,
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
      </main>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => setFilter({
          ...filter,
          ...localFilter,
        }) }
      >
        Ordenar
      </button>
      {filter.filterbyNumericValues.length > 0
          && (
            filter.filterbyNumericValues.map((value, index) => (
              <div data-testid="filter" key={ index }>
                <span>{`${value.column} `}</span>
                <span>{`${value.comparison} `}</span>
                <span>{`${value.value} `}</span>
                <button
                  onClick={ removeFilter }
                  type="button"
                >
                  X
                </button>
              </div>
            ))
          )}
      <Table data={ sortResults(search(planets)) } />
    </div>
  );
}
