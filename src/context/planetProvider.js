import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './planetContext';

function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keys, setKeys] = useState([]);
  const [arrayPlanets, setArrayPlanets] = useState([]);
  const [filters, setFilters] = useState({ filterByName: {
    name: '',
  },
  filterByNumericValues: [] });

  async function fetchPlanets() {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const response = await request.json();
    const data = response;
    const header = Object.keys(response.results[0]).filter((key) => key !== 'residents');
    setPlanets(data);
    setArrayPlanets(data.results);
    setIsLoading(false);
    setKeys(header);
  }

  // function filterNames() {
  //   const filteredNames = planets.results
  //     .filter((planet) => planet.name.includes(filters.filterByName.name));
  //   return filteredNames;
  // }

  // function filteredByNumber() {
  //     if (filters.filterByNumericValues[0].comparison === "maior que") {
  //     return filterNames().filter((planet) => parseInt(planet[`${filters.filterByNumericValues[0].column}`]) > `${filters.filterByNumericValues[0].value}`);
  //     } if (filters.filterByNumericValues[0].comparison === "menor que") {
  //     return filterNames().filter((planet) => parseInt(planet[`${filters.filterByNumericValues[0].column}`]) < `${filters.filterByNumericValues[0].value}`);
  //     } if (filters.filterByNumericValues[0].comparison === "igual a") {
  //     return filterNames().filter((planet) => parseInt(planet[`${filters.filterByNumericValues[0].column}`]) === `${filters.filterByNumericValues[0].value}`);
  //     }
  // }

  function filteredByNumber() {
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((element) => {
        if (element.comparison === 'maior que') {
          setArrayPlanets(arrayPlanets
            .filter(
              (planet) => parseInt(planet[`${element.column}`], 10) > `${element.value}`,
            ));
          return arrayPlanets;
        } if (element.comparison === 'menor que') {
          setArrayPlanets(arrayPlanets
            .filter(
              (planet) => parseInt(planet[`${element.column}`], 10) < `${element.value}`,
            ));
          return arrayPlanets;
        } if (element.comparison === 'igual a') {
          setArrayPlanets(arrayPlanets
            .filter(
              (planet) => parseInt(planet[`${element.column}`], 10)
              === parseInt(`${element.value}`, 10),
            ));
          return arrayPlanets;
        }
      });
    }
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <PlanetContext.Provider
      value={ { planets,
        isLoading,
        keys,
        fetchPlanets,
        filters,
        setFilters,
        filteredByNumber,
        arrayPlanets } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
