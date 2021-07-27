import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import response from './testData';

const options = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [columnFilterOptions, setColumnFilterOptions] = useState(options);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
     filterByNumericValues: [],
  });

  const fetchData = () => fetch(url)
    .then((result) => result.json())
    .then(({ results }) => setData(response.results.map((element) => {
      delete element.residents;
      return element;
    })))
    .catch((err) => err);

  const setFilterByName = (name) => {
    setFilters({ filterByName: { name } });
  };

  const filterByName = () => {
    setFilteredData(data.filter(({ name }) => name.includes(filters.filterByName.name)));
  };

  const contextValue = {
    data,
    fetchData,
    filters,
    setFilterByName,
    filteredData,
    setFilteredData,
    filterByName,
    columnFilterOptions,
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
