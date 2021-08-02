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
    setPlanets(data);
    const { filterByName: { name } } = filters;
    if (name) {
      const filteredPlanets = filterFunctions.filterByName(data, name);
      setPlanets(filteredPlanets);
    }
  }, [data, filters]);

  const contextValue = {
    data,
    setData,
    planets,
    setPlanets,
    handleTextFilter,

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
