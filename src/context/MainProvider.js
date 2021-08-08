import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsAPI from '../services/starWarsAPI';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [value, setValue] = useState({ data: [] });

  useEffect(() => {
    const getPlanets = async () => {
      setValue({ data: await starWarsAPI() });
    };
    getPlanets();
  }, []);

  return (
    <MainContext.Provider value={ value }>
      { children }
    </MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainProvider;
