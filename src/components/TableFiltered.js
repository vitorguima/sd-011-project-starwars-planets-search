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

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((result) => { setPlanets(result.results); });
  }, []);

  // useEffect(() => {
  //   setFiltered(planets.filter((planet) => (planet.name.toUpperCase()
  //     .includes(filter.filterByName.name))));
  // }, [filter.filterByName.name, planets, setFiltered]);

  // useEffect(() => {
  //   if (filter.filterbyNumericValues) {
  //     const filteredResult = [...filtered];
  //     filter.filterbyNumericValues.forEach(({ comparison, column, value }) => {
  //       if (comparison === 'maior que') {
  //         filteredResult.filter((element) => parseInt(element[column], 0)
  //         > parseInt(value, 0));
  //       }
  //       if (comparison === 'menor que') {
  //         filteredResult.filter((element) => parseInt(element[column], 0)
  //         < parseInt(value, 10));
  //       }
  //       if (comparison === 'igual a') {
  //         filteredResult.filter((element) => parseInt(element[column], 0)
  //         === parseInt(value, 0));
  //       }
  //     });
  //     setFiltered(filteredResult);
  //   }
  // }, [filter.filterByName.name, filter.filterbyNumericValues, planets, setFiltered]);

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

  // const search = (planetsS) => {
  //   const minusOne = -1;
  //   const { filterbyNumericValues } = filter;
  //   if (filterbyNumericValues[0]) {
  //     const results = [];
  //     filterbyNumericValues.forEach((filters) => {
  //       const { comparison, column, value } = filters;
  //       switch (comparison) {
  //       case 'maior que':
  //         results.push(planetsS.filter((planet) => (
  //           planet.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
  //             && parseInt(planet[column], 0) > parseInt(value, 0))));
  //         break;
  //       case 'menor que':
  //         results.push(planetsS.filter((planet) => (
  //           planet.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
  //                 && parseInt(planet[column], 0) < parseInt(value, 0))));
  //         break;
  //       case 'igual a':
  //         results.push(planetsS.filter((planet) => (
  //           planet.name.toUpperCase().indexOf(filter.filterByName.name) > minusOne
  //                     && parseInt(planet[column], 0) === parseInt(value, 0))));
  //         break;
  //       default:
  //       }
  //     });
  //     if (results[0] && results[1]) {
  //       const AllFiltered = results[0].filter((planet) => {
  //         results[1].includes(planet);
  //       });
  //       return AllFiltered;
  //     }
  //     return results[0];
  //   }
  //   return planets.filter((planet) => (planet.name.toUpperCase()
  //     .includes(filter.filterByName.name)));
  // };

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
      { filter.filterbyNumericValues.length > 0
      && (
        filter.filterbyNumericValues.map((value, index) => (
          <div data-testid="filter" key={ index }>
            <span>{ `${value.column} ` }</span>
            <span>{ `${value.comparison} ` }</span>
            <span>{ `${value.value} ` }</span>
            <button
              onClick={ removeFilter }
              type="button"
            >
              X
            </button>
          </div>
        ))
      )}
      <Table data={ search(planets) } />
    </div>
  );
}
