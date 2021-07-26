import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContex';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: '',
        value: '0',
      },
    ],
  });

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((api) => api.json());
      results.filter((item) => delete item.residents);
      setData(results);
    };
    getAPI();
  }, []);

  const handleChange = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value } });
  };

  const handleValue = ({ target }) => {
    setFilters({ ...filters, filterByNumericValues: { name: target.value } });
  };

  return (
    <PlanetContext.Provider value={ { data, filters, handleChange, handleValue } }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default PlanetsProvider;
