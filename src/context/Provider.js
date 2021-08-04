import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPlanets } from '../services/PlanetsApi';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  async function fetchPlanets() {
    const planetsAPI = await getPlanets();
    planetsAPI.results.map((result) => delete result.residents);
    setFiltered(planetsAPI.results);
    setData(planetsAPI.results);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  function filterName() {
    const filteredData = data.filter(
      (planet) => planet.name.toLowerCase().includes(filters.filterByName.name),
    );
    setFiltered(filteredData);
  }

  useEffect(filterName, [filters.filterByName]);

  function filterNumeric(numericFilter) {
    setFilters({
      ...filters,
      filterByNumericValues: [numericFilter],
    });
    const { column, comparison, value } = numericFilter;
    const filteredNumeric = data.filter((item) => {
      switch (comparison) {
      case 'maior que':
        return parseInt(item[`${column}`], 10) > parseInt(value, 10);
      case 'menor que':
        return parseInt(item[`${column}`], 10) < parseInt(value, 10);
      case 'igual a':
        return parseInt(item[`${column}`], 10) < parseInt(value, 10);
      default:
        return null;
      }
    });
    setFiltered(filteredNumeric);
  }

  return (
    <PlanetsContext.Provider
      value={ {
        filtered,
        data,
        setFilters,
        filters,
        filterNumeric,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
