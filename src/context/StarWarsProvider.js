import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getThePlanets } from '../services';
import * as filterfunctions from '../functions/FilterFunctions';

function StarWarsProvider({ children }) {
  const initialFiltes = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(initialFiltes);

  function handleTextFilter({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  function handleNumericalFilter(numericFilter) {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues, numericFilter,
      ],
    });
  }

  useEffect(() => {
    const get = async () => {
      const r = await getThePlanets();
      await setData(r);
    };
    get();
  }, []);

  useEffect(() => {
    let filteredPlanets = [...data];
    const { filterByName: { name }, filterByNumericValues } = filters;
    if (name) {
      filteredPlanets = filterfunctions.filterByName(data, name);
    }

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        filteredPlanets = filterfunctions.filterByNumber(
          comparison, column, value, filteredPlanets,
        );
      });
    }
    setPlanets(filteredPlanets);
  }, [data, filters]);

  const contextValue = {
    data,
    setData,
    filters,
    setFilters,
    handleTextFilter,
    planets,
    setPlanets,
    handleNumericalFilter,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
