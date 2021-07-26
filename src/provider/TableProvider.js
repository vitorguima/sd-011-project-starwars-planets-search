import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from '../context/TableContext';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planets = await response.json();
      setData(data.concat(planets.results));
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <TableContext.Provider value={ { data, isLoading, setIsLoading } }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
