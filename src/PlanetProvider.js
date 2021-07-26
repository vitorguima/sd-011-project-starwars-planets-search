import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './context/PlanetContex';

function PlanetProvider({ children }) {
  const [result, setResult] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: '',
        value: 0,
      },
    ],
  });

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setResult(results);
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
    <PlanetContext.Provider value={ { result, filters, handleChange, handleValue } }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = ({
  children: PropTypes.node,
}).isRequired;

export default PlanetProvider;
