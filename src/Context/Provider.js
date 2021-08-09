import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchPlanets from '../services/fetchPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const value = {
    planets,
    setPlanets,
  };

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
