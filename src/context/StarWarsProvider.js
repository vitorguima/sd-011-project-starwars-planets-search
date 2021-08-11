import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import { getThePlanets } from '../services';

function StarWarsProvider({ children }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const get = async () => {
      const r = await getThePlanets();
      await setData(r);
    };
    get();
  }, []);
  console.log(data);
  const contextValue = {
    data,
  };
  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
