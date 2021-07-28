import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextApp from './ContextApp';
import fetchAPI from '../services/apiRequest';

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filters, setFilter] = useState([]);

  useEffect(() => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets';

    const getPlanets = async () => {
      const planets = await fetchAPI(url);
      planets.forEach((planet) => delete planet.residents);
      const title = Object.keys(planets[0]).map((info) => info.replace('_', ' '));

      setData(planets);
      setTitles(title);
    };

    getPlanets();
  }, []);

  const contextValue = { data, titles, filters, setFilter };

  return (
    <ContextApp.Provider value={ contextValue }>
      { children }
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
}.isRequired;

export default AppProvider;
