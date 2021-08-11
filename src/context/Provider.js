import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

const INITIAL_FILTERS = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const INITIAL_COLUMNS_OPTIONS = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [columnsOptions, setColumnsOptions] = useState(INITIAL_COLUMNS_OPTIONS);

  const contextValue = { data, filters, setFilters, columnsOptions, setColumnsOptions };

  useEffect(() => {
    const getPlanetsAPI = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await response.json();
      setData(json.results);
    };
    getPlanetsAPI();
  }, []);

  return (
    <SWContext.Provider value={ contextValue }>
      {children}
    </SWContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
