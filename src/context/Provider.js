import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../service/api';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchApi2 = async () => {
    const response = await fetchApi();
    setData(response);
  };

  useEffect(() => { fetchApi2(); }, []);

  const globalState = { data, setData };

  return (
    <Context.Provider value={ globalState }>
      {children}
    </Context.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
