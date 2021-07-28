import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import response from './testData';

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
  const [newFilter, setNewFilter] = useState({ column: columnFilterOptions[0],
    comparison: 'maior que',
    value: 0,
  });
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  const fetchData = () => fetch(url)
    .then((result) => result.json())
    .then(() => setData(response.results.map((element) => {
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

  useEffect(() => {
    setNewFilter({ column: columnFilterOptions[0], comparison: 'maior que', value: 0 });
  }, [columnFilterOptions]);

  const setFilterByName = (name) => {
    setFilters((state) => ({ ...state, filterByName: { name } }));
  };

  const applyFilterByNumericValues = () => {
    const newData = filters.filterByNumericValues.reduce((acc, curr) => {
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
    }, filteredData);
    setFilteredData(newData);
  };

  const applyFilterByName = () => {
    setFilteredData(data.filter(({ name }) => name.includes(filters.filterByName.name)));
  };

  const contextValue = {
    data,
    fetchData,
    filters,
    setFilterByName,
    filteredData,
    setFilteredData,
    applyFilterByName,
    applyFilterByNumericValues,
    columnFilterOptions,
    newFilter,
    handleChangeNewFilter,
    setFilterByNumericValues,
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
