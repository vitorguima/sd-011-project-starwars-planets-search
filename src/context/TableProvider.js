import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TableContext from './TableContext';

export default function TableProvider({ children }) {
  const [data, setData] = useState({});
  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  });
  const [filterNumericValues, setFilterNumericValues] = React.useState({
    column: '',
    comparison: '',
    value: 0,
  });

  useEffect(() => {
    const fetchApi = () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((results) => setData(results));
    };
    fetchApi();
  }, []);

  return (
    <TableContext.Provider
      value={ {
        data,
        filters,
        setFilters,
        filterNumericValues,
        setFilterNumericValues,
      } }
    >
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
