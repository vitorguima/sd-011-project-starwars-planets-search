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
    order: {},
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

  useEffect(() => {
    const { column, sort } = order;
    if (
      column !== 'name'
      && column !== 'climate'
      && column !== 'terrain' && column !== 'films' && column !== 'url'
    ) {
      setFilteredData((oldData) => oldData.sort((a, b) => {
        switch (sort) {
        case 'ASC':
          return parseInt(a[column], 10) - parseInt(b[column], 10);
        case 'DESC':
          return parseInt(b[column], 10) - parseInt(a[column], 10);
        default:
          return 0;
        }
      }));
    }
  }, [order]);

  useEffect(() => {
    const { column, sort } = order;
    if (
      column === 'name'
      || column === 'climate'
      || column === 'terrain' || column === 'films' || column === 'url'
    ) {
      setFilteredData((oldData) => oldData.sort((a, b) => {
        switch (sort) {
        case 'ASC':
          if (a[column] > b[column]) return -1;
          if (a[column] < b[column]) return 1;
          return 0;
        case 'DESC':
          return parseInt(b[column], 10) - parseInt(a[column], 10);
        default:
          return 0;
        }
      }));
    }
  }, [order]);

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
