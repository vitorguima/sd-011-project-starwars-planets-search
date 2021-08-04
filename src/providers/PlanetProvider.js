import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';
import * as filterFunctions from '../helpers/FilterFunctions';

export default function PlanetsProvider({ children }) {
  const initialFilters = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],

  };

  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  function handleTextFilter({ target: { value } }) {
    setFilters({ ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  function handleNumericFilter(numericFilter) {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, numericFilter],
    });
    console.log(filters);
  }

  useEffect(() => {
    const setResultsAsData = async () => {
      await fetchPlanets().then(
        ((results) => (setData(results.results))),
        (() => null),
      );
    };
    setResultsAsData();
  }, []);

  useEffect(() => {
    let filteredPlanets = [...data];
    const { filterByName: { name }, filterByNumericValues } = filters;
    if (name) {
      filteredPlanets = filterFunctions.filterByName(data, name);
    }

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        filteredPlanets = filterFunctions.filterBYNumber(
          comparison,
          column,
          value,
          filteredPlanets,
        );
      });
    }
    setPlanets(filteredPlanets);
  }, [data, filters]);

  const contextValue = {
    data,
    setData,
    planets,
    setPlanets,
    handleTextFilter,
    handleNumericFilter,
    filters,

  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
