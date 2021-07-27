import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from '../context/TableContext';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userSelection, setUserSelection] = useState({
    filters: {
      filterByName: { name: '' },
      filterByNumericValues: [],
    },
  });

  const fetchPlanets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planets = await response.json();
      setData(data.concat(planets.results));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleChange = ({ target }) => {
    setUserSelection({
      filters: {
        ...userSelection.filters,
        filterByName: { name: target.value },
      },
    });
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const sharedProperties = {
    data,
    isLoading,
    userSelection,
    handleChange,
  };

  return (
    <TableContext.Provider value={ sharedProperties }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
