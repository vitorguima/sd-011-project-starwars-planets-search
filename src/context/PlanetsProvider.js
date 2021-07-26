import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import requestPlanets from '../services/requestPlanets';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isFeching, setIsFecthing] = useState(false);
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  useEffect(() => {
    setIsFecthing(true);
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
        setIsFecthing(false);
      })
      .catch(() => {
        setData({ error: '404' });
        setIsFecthing(false);
      });
  }, []);

  const setFilterByName = (name) => {
    const newFilter = {
      ...filters,
      filters: {
        filterByName: {
          name,
        },
      },
    };

    setFilters(newFilter);
  };

  const context = {
    data,
    isFeching,
    setFilterByName,
    name: filters.filters.filterByName.name,
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
