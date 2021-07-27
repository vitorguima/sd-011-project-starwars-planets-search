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
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
    ],
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

  const handleSelectors = ({ target }) => {
    const { name, value } = target;
    setFilters({ ...filters,
      filterByNumericValues: [
        {
          ...filters.filterByNumericValues[0],
          [name]: value,
        },
      ],
    });
  };

  const filterResultsByName = () => {
    const { filterByName: { name } } = filters;
    const filteredPlanets = planetsResult
      .filter((item) => item.name.toLowerCase().includes(name));
    setFilteredResult(filteredPlanets);
  };

  // const filterResultsByNumericNumbers = () => {
  //   const { filterByNumericValues: [{ column, comparison, value }] } = filters;
  //   const planetsFilteredByNumericValues = [];
  //   switch (key) {
  //     case value:
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const filterResults = () => {
    filterResultsByName();
    // filterResultsByNumericNumbers();
  };

  useEffect(() => {
    filterResults();
  }, [filters]);

  const context = {
    planetsResult,
    handleFilters,
    filteredResult,
    valuePlanets: filters.filterByName.name,
    selectorsValue: filters.filterByNumericValues,
    handleSelectors,
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
