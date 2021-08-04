import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextMain from './Context';
import getApi from '../services/api';

function Provider({ children }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getApi().then((response) => setData(response));
  }, []);
  const contextMainValue = {
    data,
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
