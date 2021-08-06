import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import requestPlanets from '../services/api';

const StarWarsContext = createContext();

function Provider({ children }) {
  const initial = {
    filterByName: '',
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initial);

  const fetchData = async () => {
    const result = await requestPlanets();
    setData(result);
  };

  const numbersToOrdened = {
    max: 1,
    min: -1,
  };

  useEffect(() => {
    fetchData();
    const { order: { column } } = initial;
    data.sort((var1, var2) => {
      if (var1[column] > var2[column]) {
        return numbersToOrdened.max;
      }
      return numbersToOrdened.min;
    });
  }, [data, initial, numbersToOrdened.max, numbersToOrdened.min]);

  const contextValue = { data, filters, setFilters, setData };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;

export { StarWarsContext, Provider };
