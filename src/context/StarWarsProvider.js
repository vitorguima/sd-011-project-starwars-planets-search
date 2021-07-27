import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchStarWarsPlanets from '../services/StarWarsAPI';

function StarWarsProvider({ children }) {
  const initalColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const initialNumericForm = { column: 'population', comparison: 'maior que', value: 0 };
  const [numericForm, setNumericForm] = useState(initialNumericForm);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });
  const [optionsColumn, setOptionsColumn] = useState(initalColumns);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  function handleFilterByNumericValues({ target: { name, value } }) {
    setNumericForm({ ...numericForm, [name]: value });
  }

  useEffect(() => {
    const getPlanets = async () => {
      const listPlanets = await fetchStarWarsPlanets();
      setPlanets(listPlanets);
    };
    getPlanets();
  }, []);

  // https://www.youtube.com/watch?v=Q8JyF3wpsHc

  function handleFilterByName({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  useEffect(() => {
    const { filterByNumericValues } = filters;
    let filteringColumns = [...initalColumns];

    if (filterByNumericValues.length > 0) {
      let tempFilteringColumns = [...filteringColumns];
      filterByNumericValues.forEach((filter) => {
        tempFilteringColumns = ([...filteringColumns.filter((column) => (
          column !== filter.column))]);
        filteringColumns = tempFilteringColumns;
      });
    }
    setOptionsColumn(filteringColumns);
    setNumericForm({ column: filteringColumns[0], comparison: 'maior que', value: 0 });
  }, [filters]);

  useEffect(() => {
    let filteringPlanets = [...planets];
    const { filterByName: { name }, filterByNumericValues } = filters;

    if (name) {
      filteringPlanets = planets.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));
    }

    if (filterByNumericValues.length > 0) {
      let filteringdByNumericValues = [...filteringPlanets];
      filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case 'maior que':
          filteringdByNumericValues = ([...filteringPlanets.filter((planet) => (
            Number(planet[filter.column]) > Number(filter.value)
          ))]);
          break;
        case 'menor que':
          filteringdByNumericValues = ([...filteringPlanets.filter((planet) => (
            Number(planet[filter.column]) < Number(filter.value)
          ))]);
          break;
        case 'igual a':
          filteringdByNumericValues = ([...filteringPlanets.filter((planet) => (
            Number(planet[filter.column]) === Number(filter.value)
          ))]);
          break;
        default:
          break;
        }
        filteringPlanets = [...filteringdByNumericValues];
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

  const contextValue = {
    planets,
    filteredPlanets,
    optionsColumn,
    numericForm,
    filters,
    handleFilterByName,
    handleFilterByNumericValues,
    onClickButtonNumericValues,
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
