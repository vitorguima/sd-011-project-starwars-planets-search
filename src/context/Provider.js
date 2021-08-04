import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextMain from './Context';
import getApi from '../services/api';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  useEffect(() => {
    getApi().then((response) => setData(response));
  }, []);
  useEffect(() => {
    getApi().then(
      (response) => setFilteredPlanets(response),
    );
  }, []);

  const filterPlanetsByName = (textName) => {
    const filtered = data.filter(
      ({ name }) => name.toLowerCase().includes(textName.toLowerCase()),
    );
    setFilteredPlanets(filtered);
  };

  const contextMainValue = {
    data,
    filteredPlanets,
    filterByName: (textName) => filterPlanetsByName(textName),
  };
  return (
    <ContextMain.Provider value={ contextMainValue }>
      {children}
    </ContextMain.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
