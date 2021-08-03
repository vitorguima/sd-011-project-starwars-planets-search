import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../service/api';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const fetchData = async () => {
    const results = await fetchApi();
    setData(results);
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    const showPlanets = () => {
      const planetFilteredName = data
        .filter((planet) => planet.name.includes(filters.filterByName.name));

      if (filters.filterByNumericValues.length === 0) {
        setFilteredPlanets(planetFilteredName);
      } else {
        const { filterByNumericValues } = filters;
        const { column, comparison, value } = filterByNumericValues[0];
        const planetFilterNumber = planetFilteredName.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[`${column}`]) > Number(value);
          } if (comparison === 'igual a') {
            return Number(planet[`${column}`]) === Number(value);
          }
          return Number(planet[`${column}`]) < Number(value);
        });
        setFilteredPlanets(planetFilterNumber);
      }
    };
    showPlanets();
  },
  [data,
    filters.filterByName.name,
    filters.filterByNumericValues,
    filters, setFilteredPlanets]);

  const globalState = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <Context.Provider value={ globalState }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
