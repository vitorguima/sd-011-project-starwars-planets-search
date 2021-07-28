import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchStarWarsPlanets from '../services/starWarsAPI';
import * as filtersServices from '../services/filtersServices';

const { filtrateName, filtrateNumber, sortNumbers, sortStrings } = filtersServices;

function StarWarsProvider({ children }) {
  const initialFilters = {
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { columnSort: 'name', sort: 'ASC' },
  };
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const listPlanets = await fetchStarWarsPlanets();
      listPlanets.sort((a, b) => (a.name > b.name) || (a.name === b.name) - 1);
      setPlanets(listPlanets);
      setFilteredPlanets(listPlanets);
    };
    getPlanets();
  }, []);

  function handleFilterByName({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  useEffect(() => {
    let filteringPlanets = [...planets];
    const { filterByName: { name }, filterByNumericValues } = filters;
    const { order: { columnSort, sort } } = filters;
    const listSortString = ['name', 'climate', 'terrain'];

    if (listSortString.includes(columnSort)) {
      filteringPlanets = sortStrings(filteringPlanets, columnSort, sort);
    } else {
      filteringPlanets = sortNumbers(filteringPlanets, columnSort, sort);
    }

    if (name) {
      filteringPlanets = filtrateName(filteringPlanets, name);
    }

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        filteringPlanets = filtrateNumber(comparison, filteringPlanets, column, value);
      });
    }

    setFilteredPlanets(filteringPlanets);
  }, [filters, planets]);

  function onClickButtonNumericValues(column, comparison, value) {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        { column, comparison, value },
      ] });
  }

  function removeFromFilterByNumericValue(element) {
    const index = filters.filterByNumericValues.indexOf(element);
    filters.filterByNumericValues.splice(index, 1);
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues,
    });
  }

  function onClickButtonSort(columnSort, sort) {
    setFilters({ ...filters, order: { columnSort, sort } });
  }

  // useEffect(() => {
  //   const { order: { columnSort, sort } } = filters;
  //   const listSortString = ['name', 'climate', 'terrain'];
  //   let sortedPlanets = [...filteredPlanets];
  //   if (listSortString.includes(columnSort)) {
  //     sortedPlanets = sortStrings(sortedPlanets, columnSort, sort);
  //   } else {
  //     sortedPlanets = sortNumbers(sortedPlanets, columnSort, sort);
  //   }
  //   setFilteredPlanets(sortedPlanets);
  // }, [filters]);

  const contextValue = {
    filteredPlanets,
    filters,
    handleFilterByName,
    onClickButtonNumericValues,
    onClickButtonSort,
    removeFromFilterByNumericValue,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({ }).isRequired,
};
