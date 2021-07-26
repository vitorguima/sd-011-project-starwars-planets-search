import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Context from './Context';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setNameFilter] = useState('');
  const [filterByNumericValues, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: '' });
  const [updateFilter, setUpdateFilter] = useState(false);

  const handleNumericFilter = ({ name: property, value }) => {
    setNumericFilter({
      ...filterByNumericValues,
      [property]: value,
    });
  };

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => {
        response.json()
          .then(({ results }) => setData(results));
      });
  }, []);

  const filterData = () => {
    const { column, comparison, value } = filterByNumericValues;
    const newData = data.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return parseInt(planet[column], 10) > parseInt(value, 10);
      case 'menor que':
        return parseInt(planet[column], 10) < parseInt(value, 10);
      default:
        return parseInt(planet[column], 10) === parseInt(value, 10);
      }
    });
    return newData;
  };

  useEffect(() => {
    const filter = () => {
      if (updateFilter) {
        const newData = filterData();
        setFilteredData(newData);
        setUpdateFilter(false);
      }
    };
    filter();
  });

  const contextValue = {
    data,
    filteredData,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        { ...filterByNumericValues },
      ],
    },
    setNameFilter,
    handleNumericFilter,
    setUpdateFilter,
  };
  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.object,
}.isRequired;
