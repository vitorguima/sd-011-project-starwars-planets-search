import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarWarsContext from './StarWarsContext';
import { getThePlanets } from '../services';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const get = async () => {
      const listPlanets = await getThePlanets();
      await setData(listPlanets);
      console.log(listPlanets);
    };
    get();
  }, []);

  return (
    <StarWarsContext.Provider value={ data }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
