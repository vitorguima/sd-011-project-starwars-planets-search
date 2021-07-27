import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [columnsAvailable, setColumnsAvailable] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filtered, setFiltered] = useState([]);
  const [filtersByNumeric, setFiltersByNumeric] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name },
    filterByNumericValues: filtersByNumeric,
  });

  useEffect(() => {
    const getPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(url).then((result) => result.json());
      setData(results);
      setFiltered(results);
    };

    getPlanets();
  }, []);

  const context = {
    name,
    data,
    filters,
    filtered,
    filtersByNumeric,
    columnsAvailable,
    setData,
    setName,
    setFilters,
    setFiltered,
    setFiltersByNumeric,
    setColumnsAvailable,
  };

  return (
    <div>
      <PlanetsContext.Provider value={ context }>
        { children }
      </PlanetsContext.Provider>
    </div>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
