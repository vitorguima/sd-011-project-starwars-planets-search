import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from '../context/TableContext';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdown, setDropdown] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

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

  const handleDropdownChange = ({ target }) => {
    setDropdown({
      ...dropdown,
      [target.id]: target.value,
    });
  };

  const addDropdownFilter = () => {
    setUserSelection({
      filters: {
        ...userSelection.filters,
        filterByNumericValues: [
          ...userSelection.filters.filterByNumericValues,
          dropdown,
        ],
      },
    });
  };

  const removeFilter = (key) => {
    setUserSelection({
      filters: {
        ...userSelection.filters,
        filterByNumericValues: [
          ...userSelection
            .filters
            .filterByNumericValues
            .filter((_, idx) => key !== idx),
        ],
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
    dropdown,
    handleChange,
    handleDropdownChange,
    setDropdown,
    addDropdownFilter,
    removeFilter,
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
