import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext({});

export function TableContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

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
    filterColumns: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  };

  const filtersReducer = (state, action) => {
    switch (action.type) {
    case 'NAME':
      return {
        ...state,
        filterByName: { name: action.payload },
      };
    case 'VALUE_ADD':
      return {
        ...state,
        filterByNumericValues: [
          ...state.filterByNumericValues, {
            column: action.payload.column,
            comparison: action.payload.comparison,
            value: action.payload.value,
          },
        ],
        filterColumns: state.filterColumns.filter((item) => (
          item !== action.payload.column
        )),
      };
    case 'VALUE_REMOVE':
      return {
        ...state,
        filterByNumericValues: state.filterByNumericValues.filter((item) => (
          item.column !== action.payload
        )),
        filterColumns: [...state.filterColumns, action.payload],
      };
    default:
      break;
    }
  };

  const [filters, setFilters] = useReducer(filtersReducer, filtersInitialState);

  useEffect(() => {
    const filterByName = data.filter((item) => (
      item.name.toLowerCase().includes(filters.filterByName.name.toLowerCase())
    ));

    setFilteredData(filterByName);
  }, [filters, data]);

  useEffect(() => {
    const filtersValue = filters.filterByNumericValues;
    const receivedFilteredData = [];

    if (filtersValue.length === 0) {
      setFilteredData(data);
      return;
    }

    filtersValue.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        receivedFilteredData.push(data.filter((item) => (
          parseFloat(item[filter.column]) > parseFloat(filter.value)
        )));
        break;
      case 'menor que':
        receivedFilteredData.push(data.filter((item) => (
          parseFloat(item[filter.column]) < parseFloat(filter.value)
        )));
        break;
      case 'igual a':
        receivedFilteredData.push(data.filter((item) => (
          parseFloat(item[filter.column]) === parseFloat(filter.value)
        )));
        break;
      default:
        break;
      }
      const lastIndex = receivedFilteredData.length - 1;
      setFilteredData(receivedFilteredData[lastIndex]);
    });
  }, [filters.filterByNumericValues, data]);

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
