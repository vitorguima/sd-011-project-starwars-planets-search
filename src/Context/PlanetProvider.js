import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, loadedPlanets] = useState([]);
  const [filteredPlanets, filterPlanetList] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);
  const INITIAL_STATES = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  };
  const [filters, setFilters] = useState(INITIAL_STATES);
  const [orderFilters, setOrderFilters] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const sortingPlanets = (planetList) => {
    const { order } = filters;
    const planetsSorted = planetList.sort((a, b) => {
      let sortedList = {};
      const test = a[order.column] === 'unknown'
        ? false
        : Number.isNaN(Number(a[order.column]));
      if (test) {
        sortedList = order.sort === 'ASC'
          ? a[order.column].localeCompare(b[order.column])
          : b[order.column].localeCompare(a[order.column]);
      } else {
        sortedList = order.sort === 'ASC'
          ? Number(a[order.column] - b[order.column])
          : Number(b[order.column] - a[order.column]);
      }
      return (sortedList);
    });
    return (planetsSorted);
  };

  const deleteFilter = (column) => {
    const filterByNumericValues = filters.filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilters({
      ...filters,
      filterByNumericValues,
    });
  };

  function orderFiltersFunction({ target }) {
    setOrderFilters({
      ...orderFilters,
      [target.name]: target.value,
    });
  }

  const updateColumnOptions = () => {
    const initialColumnOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    const activeFilters = filters.filterByNumericValues.map((filter) => filter.column);
    const newColumnOptions = initialColumnOptions
      .filter((option) => !activeFilters.includes(option));
    setColumnOptions(newColumnOptions);
  };

  const orderButtonClick = (newOrderFilter) => {
    setFilters({
      ...filters,
      order: { ...newOrderFilter },
    });
    console.log(filters);
  };

  const numericFilters = (newFilter) => {
    const filterByNumericValues = filters.filterByNumericValues
      .filter((filter) => filter.column !== newFilter.column);
    filterByNumericValues.push(newFilter);
    setFilters({
      ...filters,
      filterByNumericValues,
    });
  };

  const tableFilter = () => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    const regexpNameFilter = new RegExp(name, 'i');
    let planetsFiltered = data.filter((planet) => regexpNameFilter.test(planet.name));
    filterPlanetList(planetsFiltered);
    filterByNumericValues.forEach((filter) => {
      const { comparison, value, column } = filter;
      if (comparison !== '' && value !== '') {
        switch (comparison) {
        case 'menor que':
          planetsFiltered = planetsFiltered
            .filter((planet) => Number(planet[column]) < Number(value));
          break;
        case 'maior que':
          planetsFiltered = planetsFiltered
            .filter((planet) => Number(planet[column]) > Number(value));
          break;
        case 'igual a':
          planetsFiltered = planetsFiltered
            .filter((planet) => Number(planet[column]) === Number(value));
          break;
        default: console.log('Erro');
        }
      }
    });
    planetsFiltered = sortingPlanets(planetsFiltered);
    filterPlanetList(planetsFiltered);
  };

  useEffect(() => {
    tableFilter();
    updateColumnOptions();
  }, [filters, data]);

  const apiFetch = async () => {
    setIsLoading(true);
    let planetData = [];
    const api = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const apiJSON = await api.json();
    const planets = apiJSON.results;
    const planetsToTable = planets.map((planet) => {
      delete planet.resident;
      return planet;
    });
    planetData = [...planetData, ...planetsToTable];
    loadedPlanets(planetData);
    setIsLoading(false);
  };

  useEffect(() => {
    const start = async () => {
      await apiFetch();
    };
    start();
  }, []);

  const changeNameFilter = (nameFilter) => {
    const filterByName = { name: nameFilter };
    setFilters({
      ...filters,
      filterByName,
    });
  };

  return (
    <planetContext.Provider
      value={ {
        filteredPlanets,
        apiFetch,
        isLoading,
        filters,
        numericFilters,
        changeNameFilter,
        columnOptions,
        deleteFilter,
        orderFiltersFunction,
        orderFilters,
        orderButtonClick,
      } }
    >
      {children}
    </planetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape(
    PropTypes.object,
  )),
}.isRequired;

export const columnTitles = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

export const comparatorOptions = [
  'maior que',
  'igual a',
  'menor que',
];

export default PlanetProvider;
