import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsAPI from '../services/starWarsAPI';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {},
  });

  useEffect(() => {
    const getPlanets = async () => {
      setData(await starWarsAPI());
    };
    getPlanets();
  }, []);

  return (
    <MainContext.Provider
      value={ {
        data,
        filters,
        setFilters,
        setData,
        sets: { setData, setFilters },
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
