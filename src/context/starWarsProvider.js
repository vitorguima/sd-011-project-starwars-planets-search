import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starWarsContex from './starWarsContex';
import starWarsApi from '../services/starWarsApi';

function StarWarsProvider(props) {
  const [data, setdata] = useState([]);

  const arrayApi = async () => {
    const planet = await starWarsApi();
    setdata(planet);
  };
  useEffect(() => {
    arrayApi();
  }, []);

  const { children } = props;
  return (
    <starWarsContex.Provider
      value={ data }
    >
      {children}
    </starWarsContex.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StarWarsProvider;
