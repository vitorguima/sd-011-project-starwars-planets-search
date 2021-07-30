import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext({});

export function TableContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('Maior que');
  const [value, setValue] = useState(0);

  useEffect(() => {
    const requestData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseData = await response.json();
      setData(responseData.results);
      setFilteredData(responseData.results);
    };
    requestData();
  }, []);

  const filtersInitialState = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const filtersReducer = (state, action) => {
    switch (action.type) {
    case 'NAME':
      return {
        ...state,
        filterByName: { name: action.payload },
      };
    case 'VALUE':
      return {
        ...state,
        filterByNumericValues: [
          ...state.filterByNumericValues, {
            column: action.payload.column,
            comparison: action.payload.comparison,
            value: action.payload.value,
          },
        ],
      };
    default:
      break;
    }
  };

  const [filters, setFilters] = useReducer(filtersReducer, filtersInitialState);

  useEffect(() => {
    if (filters.filterByName.name.length === 0) {
      setFilteredData(data);
    }
    const filter = data.filter((item) => (
      item.name.toLowerCase().includes(filters.filterByName.name.toLowerCase())
    ));
    setFilteredData(filter);
  }, [filters, data]);

  return (
    <TableContext.Provider
      value={ {
        data,
        filteredData,
        filters,
        column,
        comparison,
        value,
        setFilters,
        setColumn,
        setComparison,
        setValue,
      } }
    >
      {children}
    </TableContext.Provider>
  );
}

TableContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTable = () => useContext(TableContext);
