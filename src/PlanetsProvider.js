import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [columnFilterOptions, setColumnFilterOptions] = useState(options);
  const [newOrder, setNewOrder] = useState({ column: 'name', sort: 'ASC' });
  const [newFilter, setNewFilter] = useState({ column: columnFilterOptions[0],
    comparison: 'maior que',
    value: 0,
  });
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  });

  const fetchData = () => fetch(url)
    .then((result) => result.json())
    .then((response) => setData(response.results.map((element) => {
      delete element.residents;
      return element;
    })))
    .catch((err) => err);

  const handleChangeNewFilter = ({ target }) => {
    const { name, value } = target;
    setNewFilter((state) => ({ ...state, [name]: value }));
  };

  const setFilterByNumericValues = () => {
    setFilters((state) => ({
      ...state,
      filterByNumericValues: [...state.filterByNumericValues, newFilter],
    }));
    setColumnFilterOptions(columnFilterOptions
      .filter((item) => item !== newFilter.column));
  };

  const removeFilterByNumericValues = (column) => {
    setFilters((state) => ({
      ...state,
      filterByNumericValues: state.filterByNumericValues
        .filter((item) => column !== item.column),
    }));
    setColumnFilterOptions((state) => [column, ...state]);
  };

  useEffect(() => {
    setNewFilter({ column: columnFilterOptions[0], comparison: 'maior que', value: 0 });
  }, [columnFilterOptions]);

  const setFilterByName = (name) => {
    setFilters((state) => ({ ...state, filterByName: { name } }));
  };

  const applyFilterByNumericValues = (newData) => {
    newData = filters.filterByNumericValues.reduce((acc, curr) => {
      const { column, comparison, value } = curr;
      switch (comparison) {
      case 'maior que':
        return acc.filter((item) => parseInt(item[column], 10) > parseInt(value, 10));
      case 'menor que':
        return acc.filter((item) => parseInt(item[column], 10) < parseInt(value, 10));
      case 'igual a':
        return acc.filter((item) => parseInt(item[column], 10) === parseInt(value, 10));
      default: return acc;
      }
    }, newData);
    return newData;
  };

  const orderData = (newData) => {
    const { column, sort } = filters.order;
    const sortedData = newData.sort((a, b) => {
      if (sort === 'ASC') {
        return a[column].localeCompare(b[column], undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      }
      return b[column].localeCompare(a[column], undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
    return sortedData;
  };

  const applyFilterByName = () => data.filter(({ name }) => name
    .includes(filters.filterByName.name));

  const applyFilters = () => {
    let newData = applyFilterByName();
    newData = applyFilterByNumericValues(newData);
    newData = orderData(newData);
    setFilteredData(newData);
  };

  const contextValue = {
    data,
    fetchData,
    filters,
    setFilters,
    setFilterByName,
    filteredData,
    setFilteredData,
    applyFilters,
    columnFilterOptions,
    newFilter,
    handleChangeNewFilter,
    setFilterByNumericValues,
    removeFilterByNumericValues,
    newOrder,
    setNewOrder,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
