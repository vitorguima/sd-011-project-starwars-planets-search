import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState([]);
  const [dropFilter, setDropFilter] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  });

  const value = {
    planets,
    setPlanets,
    filter,
    setFilter,
    planetFiltered,
    setPlanetFiltered,
    dropFilter,
    setDropFilter,
  };

  useEffect(() => {
    const filterPlanet = () => {
      const planetFilter = planets.filter((planet) => (
        (planet.name).includes(filter.filterByName.name) === true));
      setPlanetFiltered(planetFilter);
    };
    filterPlanet();
  }, [filter, planets]);

  useEffect(() => {
    const dropsPlanets = () => {
      const drops = planetFiltered.filter((planet) => {
        const planetColumn = Number(planet[filter.filterByNumericValues.column]);
        const valueColumn = Number(filter.filterByNumericValues.value);
        if (filter.filterByNumericValues.comparison === 'maior que') {
          return (
            planetColumn > valueColumn
          );
        }
        if (filter.filterByNumericValues.comparison === 'menor que') {
          return (
            planetColumn < valueColumn
          );
        }
        return planetColumn === valueColumn;
      });
      setDropFilter(drops);
    };
    dropsPlanets();
  }, [filter, planetFiltered, setDropFilter]);

  // useEffect(() => {
  //   const dropFilterPlanet = () => {
  //     if (planets[0] !== undefined) {
  //       const planetDrop = Object.keys(planets[0]).filter((planet) => (
  //         (planet).includes(dropFilter) === true));
  //       setPlanetFiltered(planetDrop);
  //     }
  //   };
  //   dropFilterPlanet();
  // }, [dropFilter, planets]);

  useEffect(() => {
    fetchPlanets().then((data) => setPlanets(data));
  }, [setPlanets]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape(Object).isRequired,
};

export default Provider;
