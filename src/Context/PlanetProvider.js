import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, loadedPlanets] = useState([]);
  const [filteredPlanets, filterPlanetList] = useState([]);
  const INITIAL_STATES = {
    filterByName: {
      name: '',
    },
  };
  const [filters, setFilters] = useState(INITIAL_STATES);

  const tableFilter = () => {
    const { filterByName: { name } } = filters;
    const regexpNameFilter = new RegExp(name, 'i');
    const planetsFiltered = data.filter((planet) => regexpNameFilter.test(planet.name));
    filterPlanetList(planetsFiltered);
  };

  useEffect(() => {
    tableFilter();
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
        isLoading,
        changeNameFilter,
        filteredPlanets,
        filters,
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

export default PlanetProvider;
