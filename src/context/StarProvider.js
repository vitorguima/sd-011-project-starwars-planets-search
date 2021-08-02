import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../service/dataAPI';
import StarContext from './StarContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([
    { filterByName: {} },
    { filterByNumericValues: [] },
  ]);

  useEffect(() => {
    const getDataFromAPI = async () => {
      const { results } = await getPlanets();
      return setData(results);
    };
    getDataFromAPI();
  }, []);

  const filterByNumericValues = (column, comparison, value) => {
    const updatedFilter = filters;
    updatedFilter[1].filterByNumericValues.push({
      column,
      comparison,
      value,
    });
    setFilters(updatedFilter);

    const filterPlanets = data.filter((planet) => {
      if (comparison === 'maior que') {
        return parseInt(planet[`${column}`], 10) > parseInt(value, 10);
      }
      if (comparison === 'menor que') {
        return parseInt(planet[`${column}`], 10) < parseInt(value, 10);
      }
      if (comparison === 'igual a') {
        return parseInt(planet[`${column}`], 10) === parseInt(value, 10);
      }
      return null;
    });
    setData(filterPlanets);
  };

  return (
    <StarContext.Provider value={ { data, filterByNumericValues } }>
      { children }
    </StarContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
