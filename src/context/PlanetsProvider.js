import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });
  const [options, setOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);
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

  const objValues = { data,
    filters,
    setFilters,
    options,
    setOptions,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue };

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
