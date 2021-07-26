import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './Context';

function Provider({ children }) {
  const [planetsFullList, setPlanetsFullList] = useState([]);
  const [planetsFilteredList, setPlanetsFilteredList] = useState([]);
  const [allColumns, setAllColumns] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [planetsSortedList, setPlanetsSortedList] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  );
  const { filterByNumericValues,
    order: { column: sortColumn, sort } } = filters;
  const NEGATIVE_ORDER = -1;
  const POSITIVE_ORDER = 1;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((data) => data.json())
      .then((response) => {
        setPlanetsFullList(response.results);
        setPlanetsFilteredList(response.results);
      });
  }, []);

  const sortPlanets = useCallback((filteredPlanets) => {
    if (sort === 'ASC') {
      setPlanetsSortedList(filteredPlanets.sort((a, b) => {
        if (sortColumn === 'orbital_period') {
          return parseInt(a[sortColumn], 10) - parseInt(b[sortColumn], 10);
        }
        return a[sortColumn] < b[sortColumn]
          ? NEGATIVE_ORDER : POSITIVE_ORDER;
      }));
    } else {
      setPlanetsSortedList(filteredPlanets.sort((a, b) => {
        if (sortColumn === 'orbital_period' || sortColumn === 'rotation_period'
        || sortColumn === 'diameter' || sortColumn === 'population') {
          return parseInt(b[sortColumn], 10) - parseInt(a[sortColumn], 10);
        }
        return b[sortColumn] < a[sortColumn]
          ? NEGATIVE_ORDER : POSITIVE_ORDER;
      }));
    }
  }, [NEGATIVE_ORDER, POSITIVE_ORDER, sort, sortColumn]);

  useEffect(() => {
    const filteredPlanets = planetsFullList
      .filter((planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase()));

    let filteredByNumeric = filteredPlanets;

    if (filterByNumericValues.length === 2) {
      filteredByNumeric = filteredPlanets
        .filter((planet) => {
          if (filterByNumericValues[1].comparison === 'maior que') {
            return parseInt(planet[filterByNumericValues[1].column], 10)
            > parseInt(filterByNumericValues[1].value, 10);
          }
          if (filterByNumericValues[1].comparison === 'menor que') {
            return parseInt(planet[filterByNumericValues[1].column], 10)
            < parseInt(filterByNumericValues[1].value, 10);
          }
          return parseInt(planet[filterByNumericValues[1].column], 10)
          === parseInt(filterByNumericValues[1].value, 10);
        });
    }

    if (filterByNumericValues.length === 2 + 1) {
      filteredByNumeric = filteredPlanets
        .filter((planet) => {
          if (filterByNumericValues[2].comparison === 'maior que') {
            return parseInt(planet[filterByNumericValues[2].column], 10)
            > parseInt(filterByNumericValues[2].value, 10);
          }
          if (filterByNumericValues[2].comparison === 'menor que') {
            return parseInt(planet[filterByNumericValues[2].column], 10)
            < parseInt(filterByNumericValues[2].value, 10);
          }
          return parseInt(planet[filterByNumericValues[2].column], 10)
          === parseInt(filterByNumericValues[2].value, 10);
        });
    }

    sortPlanets(filteredByNumeric);
  }, [planetsFullList, filters, sortPlanets, filterByNumericValues]);

  const contextValue = {
    planetsFullList,
    setPlanetsFullList,
    planetsFilteredList,
    filters,
    setFilters,
    allColumns,
    setAllColumns,
    planetsSortedList,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>{children}</PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
