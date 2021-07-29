import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

function Provider({ children }) {
  const myfilter = {
    filterByName: { name: '' },
    filterByNumericValues: [],
  };

  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(myfilter);

  const fetchPlanets = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(url);
    const { results } = await response.json();
    setData(results);
    setPlanets(results);
  };

  const filterPlanetsByName = () => {
    if (filters.filterByName.name.length > 0) {
      const filteredPlanets = data.filter((planet) => (
        planet.name.includes(filters.filterByName.name)
      ));
      setPlanets(filteredPlanets);
    } else {
      setPlanets(data);
    }
  };

  const filterPlanetByNumericValues = () => {
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((option) => {
        switch (option.comparsion) {
        case 'maior que':
          setPlanets(planets.filter(
            (planet) => Number(planet[option.column]) > Number(option.value),
          ));
          break;
        case 'menor que':
          setPlanets(planets.filter(
            (planet) => Number(planet[option.column]) < Number(option.value),
          ));
          break;
        case 'igual a':
          setPlanets(planets.filter(
            (planet) => Number(planet[option.column]) === Number(option.value),
          ));
          break;
        default:
          break;
        }
      });
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    filterPlanetsByName();
    filterPlanetByNumericValues();
  }, [filters]);

  const contextValue = { data, filters, setFilters, planets, setPlanets };

  return (
    <SWContext.Provider value={ contextValue }>
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
