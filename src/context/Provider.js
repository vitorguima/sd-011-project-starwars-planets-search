import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchApi from '../service/api';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState({
    filters: {
      filterPlanetName: {
        name: '',
      },
    },
  });

  const fetchData = async () => {
    const results = await fetchApi();
    setData(results);
  };

  useEffect(() => { fetchData(); }, []);

  const globalState = { data, setData, filterPlanetName, setFilterPlanetName };

  return (
    <Context.Provider value={ globalState }>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
