import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import planetContext from '../Context/planetContext';
import planetAPI from '../services/planetsAPI';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    planetAPI().then(({ results }) => setData(results));
  }, []);
  console.log(data, setData);

  const handleChange = (value) => setName(value);

  return (
    <planetContext.Provider
      value={ { data, handleChange, filters: { filterByName: { name } } } }
    >
      {children}
    </planetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PlanetProvider;
