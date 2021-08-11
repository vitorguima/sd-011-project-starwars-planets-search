import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsAPI from '../services/starWarsAPI';
import MainContext from './MainContext';

function MainProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [listFilter, setListFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
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
        filteredData,
        listFilter,
        order,
        sets: { setData, setFilters, setListFilter, setOrder, setFilteredData },
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
