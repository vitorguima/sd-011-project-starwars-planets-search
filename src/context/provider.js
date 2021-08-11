import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsAPI from '../service/api';
import AppContext from './context';

function Provider({ children }) {
  const filtros = {
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  };
  const drop = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [data, setData] = useState({});
  const [tableHeader, setTableHeader] = useState([]);
  const [filters, setFilters] = useState(filtros);
  const [columnOptions, setColumnOptions] = useState(drop);

  const getPlanetsData = async () => {
    const planets = await planetsAPI();
    setData(planets);
    setTableHeader(Object.keys(planets.results[0]));
  };

  const resetFilter = (newFilter) => {
    setFilters({ ...filters, filterByNumericValues: newFilter });
    setColumnOptions(drop);
  };

  function setOrder(tableData, column, sort) {
    let orderedData = tableData;
    const inteiro = -1;
    if (column === 'name') {
      orderedData = tableData.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1;
        }
        return inteiro;
      });
    } else {
      orderedData = tableData.sort((a, b) => +(a[column]) - +(b[column]));
    }
    if (sort === 'DESC') {
      orderedData = orderedData.reverse();
    }
    return orderedData;
  }

  useEffect(() => {
    getPlanetsData();
  }, []);

  const contextValue = {
    data,
    tableHeader,
    filters,
    setFilters,
    columnOptions,
    setColumnOptions,
    resetFilter,
    setOrder,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}
Provider.propTypes = { children: PropTypes.element }.isRequired;

export default Provider;
