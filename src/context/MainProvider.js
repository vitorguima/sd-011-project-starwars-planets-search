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
  const [listFilter, setListFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
        listFilter,
        sets: { setData, setFilters, setListFilter },
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
