import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApiPlanets from '../services/API';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  const fetchPlanets = async () => {
    const response = await fetchApiPlanets();
    setData(response);
    console.log(response);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const context = {
    data,
    fetchPlanets,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = PropTypes.arrayOf(PropTypes.string).isRequired;

export default StarWarsProvider;
