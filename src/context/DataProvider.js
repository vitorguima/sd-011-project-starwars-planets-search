import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState([]);

  return (
    <DataContext.Provider
      value={ { data, setData, loading, setLoading, filtered, setFiltered } }
    >
      { children }
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DataProvider;
