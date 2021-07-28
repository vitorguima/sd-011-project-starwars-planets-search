import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchStarWarsPlanets from '../services/StarWarsAPI';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { columnSort: 'Name', sort: 'ASC' },
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const listPlanets = await fetchStarWarsPlanets();
      listPlanets.sort((a, b) => (a.name > b.name) || (a.name === b.name) - 1);
      setPlanets(listPlanets);
    };
    getPlanets();
  }, []);

  // https://www.youtube.com/watch?v=Q8JyF3wpsHc

  function handleFilterByName({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  useEffect(() => {
    let filteringPlanets = [...planets];
    const { filterByName: { name }, filterByNumericValues } = filters;

    if (name) {
      filteringPlanets = planets.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));
    }

    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          filteringPlanets = (filteringPlanets.filter((planet) => (
            Number(planet[filter.column]) > Number(filter.value)
          )));
          break;
        case 'menor que':
          filteringPlanets = (filteringPlanets.filter((planet) => (
            Number(planet[filter.column]) < Number(filter.value)
          )));
          break;
        case 'igual a':
          filteringPlanets = (filteringPlanets.filter((planet) => (
            Number(planet[filter.column]) === Number(filter.value)
          )));
          break;
        default:
          break;
        }
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
    const listSortString = [
      'name',
      'climate',
      'terrain',
      'gravity',
      'surface_water',
      'population'];
    const sortedPlanets = [...filteredPlanets];
    if (listSortString.includes(columnSort)) {
      if (sort === 'ASC') {
        sortedPlanets.sort((a, b) => (
          a[columnSort] > b[columnSort]) || (a[columnSort] === b[columnSort]) - 1);
      } else {
        sortedPlanets.sort((a, b) => (
          a[columnSort] < b[columnSort]) || (a[columnSort] === b[columnSort]) - 1);
      }
    } else if (sort === 'ASC') {
      sortedPlanets.sort((a, b) => a[columnSort] - b[columnSort]);
    } else {
      sortedPlanets.sort((a, b) => b[columnSort] - a[columnSort]);
    }
    setFilteredPlanets(sortedPlanets);
  }

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
