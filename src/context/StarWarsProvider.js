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
  const initialState = { column: 'population', comparison: 'maior que', value: 0 };
  const [formNumeric, setFormNumeric] = useState(initialState);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });
  const [optionsColumn, setOptionsColumn] = useState(initalColumns);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  function handleFilterByNumericValues({ target: { name, value } }) {
    setFormNumeric({ ...formNumeric, [name]: value });
  }

  useEffect(() => {
    const getPlanets = async () => {
      const listPlanets = await fetchStarWarsPlanets();
      setPlanets(listPlanets);
    };
    getPlanets();
  }, []);

  // https://www.youtube.com/watch?v=Q8JyF3wpsHc
  useEffect(() => {
    const updateFilteredPlanetsByName = () => {
      const { filterByName: { name } } = filters;
      const listFilteredByName = planets.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())
      ));
      setFilteredPlanets(listFilteredByName);
    };
    updateFilteredPlanetsByName();
  }, [filters, planets]);

  useEffect(() => {
    const updateFilteredPlanetsBNV = () => {
      const { filterByNumericValues: filterBNV } = filters;
      if (filterBNV.length > 0) {
        const planet = filterBNV[filterBNV.length - 1];
        switch (planet.comparison) {
        case 'maior que':
          setFilteredPlanets([...filteredPlanets.filter((item) => (
            Number(item[planet.column]) > Number(planet.value)
          ))]);
          break;
        case 'menor que':
          setFilteredPlanets([...filteredPlanets.filter((item) => (
            Number(item[planet.column]) < Number(planet.value)
          ))]);
          break;
        case 'igual a':
          setFilteredPlanets([...filteredPlanets.filter((item) => (
            Number(item[planet.column]) === Number(planet.value)
          ))]);
          break;
        default:
          break;
        }
      }
    };
    updateFilteredPlanetsBNV();
  }, [filters]);

  function handleFilterByName({ target: { value } }) {
    setFilters({ ...filters, filterByName: { name: value } });
  }

  useEffect(() => {
    const { filterByNumericValues: filterBNV } = filters;
    if (filterBNV.length > 0) {
      const index = optionsColumn.indexOf(filterBNV[filterBNV.length - 1].column);
      optionsColumn.splice(index, 1);
      setOptionsColumn(optionsColumn);
      setFormNumeric({ column: optionsColumn[0], comparison: 'maior que', value: 0 });
    } else {
      setOptionsColumn(initalColumns);
    }
  }, [filters]);

  function onClickButtonNumericValues(column, comparison, value) {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        { column, comparison, value },
      ] });
  }

  const contextValue = {
    planets,
    filteredPlanets,
    optionsColumn,
    formNumeric,
    handleFilterByName,
    handleFilterByNumericValues,
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
