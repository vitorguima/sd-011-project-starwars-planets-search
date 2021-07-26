import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [FilterInputs, setFilterInputs] = useState({
    column: '',
    comparison: '',
    value: 0,
  });
  const [search, setSearchName] = useState({
    filters:
     { filterByName:
      { name: '' },
     filterByNumbericValues: [],
     },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider
      value={ {
        data,
        loading,
        search,
        setSearchName,
        setFilterInputs,
        FilterInputs } }
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalStorage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
