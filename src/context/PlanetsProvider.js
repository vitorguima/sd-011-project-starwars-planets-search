import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/starwarsPlanetsAPI';
import Context from './Context';

export default function PlanetsProvider({ children }) {
  const initialStateFilters = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialStateFilters);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getDataFromAPI = async () => {
      const { results } = await getPlanets();
      return setData(results);
    };
    getDataFromAPI();
  }, []);

  useEffect(() => {
    const showPlanets = () => {
      const planetFilteredName = data
        .filter((planet) => planet.name.includes(filters.filterByName.name));

      if (filters.filterByNumericValues.length === 0) {
        setFilteredPlanets(planetFilteredName);
      } else {
        const { filterByNumericValues } = filters;
        const { column, comparison, value } = filterByNumericValues[0];
        const planetFilterNumber = planetFilteredName.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[`${column}`]) > Number(value);
          } if (comparison === 'igual a') {
            return Number(planet[`${column}`]) === Number(value);
          }
          return Number(planet[`${column}`]) < Number(value);
        });
        setFilteredPlanets(planetFilterNumber);
      }
    };
    showPlanets();
  },
  [data,
    filters.filterByName.name,
    filters.filterByNumericValues,
    filters, setFilteredPlanets]);

  const info = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <Context.Provider value={ info }>
      { children }
    </Context.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
