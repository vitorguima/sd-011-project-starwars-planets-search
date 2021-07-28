import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  useEffect(() => {
    const fetchPlanets = async () => {
      const endPoint = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      const { results } = await endPoint.json();
      results.filter((planets) => delete planets.residents);
      setData(results);
    };
    fetchPlanets();
  }, []);

  const objValues = { data, filters, setFilters };

  return (
    <PlanetsContext.Provider value={ objValues }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
