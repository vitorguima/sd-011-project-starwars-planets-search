import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchPlanet from './data';

export default function Provider({ children }) {
  const [data, setData] = useState([]);

  const resolvePromisse = async () => {
    const response = await fetchPlanet();
    setData(response);
  };

  useEffect(() => {
    resolvePromisse();
  }, []);

  return (
    <Context.Provider value={ { data } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;
