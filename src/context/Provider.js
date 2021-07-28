import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const { results } = await response.json();
      setData(results);
    };
    fetchPlanets();
  }, []);

  const contextValue = { data };

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
