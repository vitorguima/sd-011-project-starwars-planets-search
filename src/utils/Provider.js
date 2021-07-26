import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = React.useState({});
  const [filters, setFilters] = React.useState(
    {
      filterByName: {},
      filterByNumericValues: [],
      order: { column: 'name', sort: 'ASC' },
    },
  );

  const contextValue = {
    data,
    setData,
    filters,
    setFilters,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default Provider;
