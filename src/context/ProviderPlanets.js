import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/getPlanets';
import ContextPlanetsApi from './ContextPlanetsApi';

function ProviderPlanets({ children }) {
  const [planets, setPlanets] = useState([]);
  const [namePlanets, setNamePlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [options, setOptions] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);
  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setPlanets(results);
      setNamePlanets(results);
    });
  }, []);

  useEffect(() => {
    const filterPlanets = () => {
      const { filterByName } = filters;
      const inputFindPlanet = planets.filter(({ name }) => (
        name.toLowerCase().includes(filterByName.name.toLowerCase())
      ));
      setNamePlanets(inputFindPlanet);
    };
    filterPlanets();
  }, [planets, filters]);

  const allContexts = {
    planets,
    namePlanets,
    options,
    setOptions,
    filters,
    setFilters,
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
  };

  return (
    <ContextPlanetsApi.Provider value={ allContexts }>
      {children}
    </ContextPlanetsApi.Provider>
  );
}

ProviderPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderPlanets;
