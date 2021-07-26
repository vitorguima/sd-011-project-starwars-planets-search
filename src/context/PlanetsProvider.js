import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [filters, setFilters] = useState(
    { filterByName: { name: '' },
      filterByNumericValues: [],
    },
  );

  useEffect(() => {
    const fetchPlanets = async () => {
      const fetchAPI = fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await fetchAPI;
      const { results } = await response.json();
      setData(results);
    };
    fetchPlanets();
  }, []);

  return (
    <planetsContext.Provider
      value={ {
        data,
        filters,
        setFilters,
        options,
        setOptions,
      } }
    >
      { children }
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
