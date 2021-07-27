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
    filterByNumericValues: [],
  });

  const getPlanetsFromAPI = async () => {
    const { results } = await getPlanets();
    results.filter((item) => delete item.residents);
    setPlanetsResults(results);
    setFilteredResult(results);
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
    const filteredByName = planetsResult
      .filter((item) => item.name.toLowerCase().includes(name));
    setFilteredResult(filteredByName);
  };

  const filterResultsByNumericNumbers = () => {
    const { filterByNumericValues } = filters;
    if (filterByNumericValues.length) {
      let currFilteredList = [...filteredResult];
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          currFilteredList = currFilteredList.filter((item) => Number.parseInt(item[column], 10) > Number.parseInt(value, 10));
          break;
        case 'menor que':
          currFilteredList = currFilteredList.filter((item) => Number.parseInt(item[column], 10) < Number.parseInt(value, 10));
          break;
        case 'igual a':
          currFilteredList = currFilteredList.filter((item) => Number.parseInt(item[column], 10) === Number.parseInt(value, 10));
          break;
        default:
          break;
        }
      });
      setFilteredResult(currFilteredList);
      return currFilteredList;
    }
  };

  const filterResults = () => {
    filterResultsByName();
    filterResultsByNumericNumbers();
  };

  useEffect(() => {
    filterResults();
  }, [filters]);

  const addFilterOnList = (column, comparison, value) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  const context = {
    planetsResult,
    handleFilters,
    filteredResult,
    valuePlanets: filters.filterByName.name,
    addFilterOnList,
    selectors: filters.filterByNumericValues,
    filters,
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
