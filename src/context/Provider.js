import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import fetchApi from '../components/useFetchApi';

function Provider({ children }) {
  const [data, setData] = useState('');

  async function fetchUseEffect() {
    setData(await fetchApi());
  }

  useEffect(() => {
    fetchUseEffect();
  }, []);

  return (
    <MyContext.Provider value={ data }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Provider;
