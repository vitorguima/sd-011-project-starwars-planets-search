import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const Planet = createContext();

export function Provider({ children }) {
  const [data, setData] = useState(null);

  function fetchData() {
    return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((obj) => obj)
      .catch((err) => err);
  }

  const value = { data, fetchData, setData };
  return (
    <Planet.Provider value={ value }>
      { children }
    </Planet.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
