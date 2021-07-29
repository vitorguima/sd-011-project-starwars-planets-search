import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext({});

export function TableContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const requestData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseData = await response.json();
      setData(responseData.results);
      setFilteredData(responseData.results);
    };
    requestData();
  }, []);

  useEffect(() => {
    if (textInput.length !== 0) {
      setFilters({ filterByName: { name: textInput } });
      const filter = data.filter((item) => (
        item.name.toLowerCase().includes(textInput.toLowerCase())
      ));
      setFilteredData(filter);
      return;
    }
    setFilteredData(data);
  }, [textInput, data]);

  return (
    <TableContext.Provider
      value={ {
        data,
        textInput,
        filteredData,
        filters,
        setTextInput,
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
