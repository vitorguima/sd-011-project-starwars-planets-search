import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TableContext = createContext({});

export function TableContextProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseData = await response.json();
      setData(responseData.results);
    };
    requestData();
  }, []);

  return (
    <TableContext.Provider
      value={ {
        data,
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
