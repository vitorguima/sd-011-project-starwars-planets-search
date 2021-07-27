import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarsContext from './StarsContext';

function StarsProvider({ children }) {
  const [data, setData] = useState([]);
  // const [key, setKey] = useState('');

  async function fetchPlanets() {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    await fetch(url)
      .then((res) => res.json())
      .then((planets) => setData(planets.results));
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const context = {
    data,
  };

  return (
    <StarsContext.Provider value={ context }>
      {children}
    </StarsContext.Provider>
  );
}

StarsProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default StarsProvider;
