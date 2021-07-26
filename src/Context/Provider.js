import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../Helpers/fetchPlanets';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [] });

  const handleNumberFilter = (object) => {
    console.log(object);
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, object] });
  };

  useEffect(() => {
    async function fetchData() {
      const planets = await fetchPlanets();
      setData(planets.map((planet) => {
        delete planet.residents;
        return planet;
      }));
    }
    fetchData();
  }, []);

  return (
    <Context.Provider value={ { data, setFilters, filters, handleNumberFilter } }>
      {children}
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
