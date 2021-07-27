import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchStarWarsPlanets from '../services/StarWarsAPI';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const listPlanets = await fetchStarWarsPlanets();
      setPlanets(listPlanets);
    };
    getPlanets();
  }, []);

  function filtrateByNumericValues(array) {
    const { filterByNumericValues: filter } = filters;
    switch (filter[0].comparison) {
    case 'maior que':
      return array.filter((item) => (Number(item[filter[0].column]) > (filter[0].value)));
    case 'menor que':
      return array.filter((item) => Number(item[filter[0].column]) < (filter[0].value));
    case 'igual a':
      return array.filter((item) => Number(item[filter[0].column]) === (filter[0].value));
    default:
      return array;
    }
  }

  // function callSetFilteredPlanets(array) {
  //   setFilteredPlanets(array);
  // }

  // https://www.youtube.com/watch?v=Q8JyF3wpsHc
  useEffect(() => {
    const updateFilteredPlanets = () => {
      const { filterByName: { name }, filterByNumericValues } = filters;

      const listFilteredByName = planets.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));

      if (filterByNumericValues.length > 0) {
        const listFilteredByNumericValues = filtrateByNumericValues(listFilteredByName);
        setFilteredPlanets(listFilteredByNumericValues);
      } else {
        setFilteredPlanets(listFilteredByName);
      }
    };
    updateFilteredPlanets();
  }, [filters, planets]);

  function handleFilterByName({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  function onClickButtonNumericValues(column, comparison, value) {
    setFilters({
      ...filters,
      filterByNumericValues: [{ column, comparison, value: Number(value) }] });
    // filterByNumericValues: [...filters.filterByNumericValues, { column: column, comparison: comparison, value: value }]});
  }

  const contextValue = {
    planets,
    filteredPlanets,
    handleFilterByName,
    onClickButtonNumericValues,
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
