import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';
import fetchPlanets from '../services/api';

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]); // [state, setter()];
  const [loading, setLoading] = useState(false);

  async function getPlanets() {
    setLoading(true);
    const planetsAPI = await fetchPlanets();
    setData(planetsAPI);
    setLoading(false);
  }

  return (
    <DataContext.Provider value={ { data, loading, getPlanets } }>
      { children }
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.isRequired,
};

export default DataProvider;
