import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TabelaContext from '../context/TabelaContext';

export default function TabelaProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState('ASC');
  const [column, setColumn] = useState('name');
  const [userSelection, setUserSelection] = useState({
    filters: {
      filterByName: { name: '' },
      filterByNumericValues: [],
      order: { column: 'name', sort: 'ASC' },
    },
  });

  const [dropdown, setDropdown] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
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

  const handleInputChange = ({ target }) => {
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

  const handleColumnNameChange = ({ target }) => setColumn(target.value);

  const handleRadioOrderChange = ({ target }) => setOrder(target.value);

  const handleColumnOrderChange = () => {
    setUserSelection({
      filters: {
        ...userSelection.filters,
        order: {
          column,
          sort: order,
        },
      },
    });
  };

  const sharedProperties = {
    data,
    isLoading,
    userSelection,
    dropdown,
    handleInputChange,
    handleDropdownChange,
    setDropdown,
    addDropdownFilter,
    removeFilter,
    column,
    handleRadioOrderChange,
    handleColumnOrderChange,
    handleColumnNameChange,
  };

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return (
    <TabelaContext.Provider value={ sharedProperties }>
      { children }
    </TabelaContext.Provider>
  );
}

TabelaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
