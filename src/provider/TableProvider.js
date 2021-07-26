import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from '../context/TableContext';
import getPlanets from '../services/FetchPlanetsAPI';

export default function TableProvider({ children }) {
  const [planetsResult, setPlanetsResults] = useState([]);
  const [filteredResult, setFilteredResult] = useState('');

  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const getPlanetsFromAPI = async () => {
    const { results } = await getPlanets();
    results.filter((item) => delete item.residents);
    setPlanetsResults(results);
  };

  useEffect(() => {
    getPlanetsFromAPI();
  }, []);

  const handleFilters = ({ target }) => {
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const filterResultsByName = () => {
    const { filterByName: { name } } = filters;
    const filteredPlanets = planetsResult
      .filter((item) => item.name.toLowerCase().includes(name));
    setFilteredResult(filteredPlanets);
  };

  const filterResultsByNumericNumbers = () => {
    console.log('funcionou');
  };

  const filterResults = () => {
    filterResultsByName();
    filterResultsByNumericNumbers();
  };

  useEffect(() => {
    filterResults();
  }, [filters]);

  const context = {
    planetsResult,
    handleFilters,
    filteredResult,
    valuePlanets: filters.filterByName.name,
  };

  return (
    <TableContext.Provider value={ { ...context } }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
