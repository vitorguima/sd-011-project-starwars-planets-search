import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState([]);
  const [filter, setFilter] = useState({
    filters: {
      filterByName: {},
    },
  });

  const value = {
    planets,
    setPlanets,
    filter,
    setFilter,
    planetFiltered,
    setPlanetFiltered,
  };

  useEffect(() => {
    const filterPlanet = () => {
      const planetFilter = planets.filter((planet) => (
        (planet.name).includes(filter) === true));
      setPlanetFiltered(planetFilter);
    };
    filterPlanet();
  }, [filter, planets]);

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
