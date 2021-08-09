import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsAPI from '../services/starWarsAPI';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {},
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      setData(await starWarsAPI());
      setFilteredData(await starWarsAPI());
    };
    getPlanets();
  }, []);

  return (
    <MainContext.Provider
      value={ {
        data,
        filters,
        setFilters,
        filteredData,
        setFilteredData,
      } }
    >
      { children }
    </MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainProvider;
