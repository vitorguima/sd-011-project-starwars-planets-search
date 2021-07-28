import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import requestPlanets from '../services/requestPlanets';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState({
    results: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [{}],
    },
  });
  const [defaultColunsFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    setIsLoading(true);
    requestPlanets()
      .then((response) => {
        // Referência para remover uma chave do objeto: https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/
        const planetList = {
          ...response,
          results: response.results.map((planet) => {
            delete planet.residents;
            return planet;
          }),
        };

        setData(planetList);
        setIsLoading(false);
      })
      .catch(() => {
        setData({ error: '404' });
        setIsLoading(false);
      });
  }, []);

  const setFilterByName = (name) => {
    const newFilterName = {
      filters: {
        ...filters.filters,
        filterByName: {
          name,
        },
      },
    };

    setFilters(newFilterName);
  };

  const addNewNumericFilter = ({ column, comparison, value }) => {
    const newFilter = {
      ...filters,
      filters: {
        ...filters.filters,
        filterByNumericValues: [
          ...filters.filters.filterByNumericValues,
          {
            column,
            comparison,
            value,
          },
        ],
      },
    };

    setFilters(newFilter);
  };

  const removeNumericFilter = (valueToFilter) => {
    const newFilter = {
      ...filters,
      filters: {
        ...filters.filters,
        filterByNumericValues: filters
          .filters
          .filterByNumericValues
          .filter((filterOption) => filterOption.column !== valueToFilter),
      },
    };

    setFilters(newFilter);
  };

  const context = {
    data,
    isLoading,
    filters,
    defaultColunsFilters,
    setFilterByName,
    addNewNumericFilter,
    removeNumericFilter,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
