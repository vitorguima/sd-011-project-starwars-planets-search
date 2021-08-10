import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [columns, setColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    fetchApi()
      .then((result) => setData(result));
  }, []);

  useEffect(() => {
    setDataTable(data);
  }, [data]);

  useEffect(() => {
    const { filterByNumericValues, filterByName } = filters;

    let filteredResult = data.filter(
      (planet) => planet.name.includes(filterByName.name),
    );

    if (filterByNumericValues) {
      filterByNumericValues.forEach((numFilter) => {
        const { column, comparison, value } = numFilter;
        filteredResult = filteredResult.filter(
          (planet) => {
            if (comparison === 'maior que') return planet[column] > Number(value);
            if (comparison === 'igual a') return planet[column] === value;
            return planet[column] < Number(value);
          },
        );
      });
    }
    setDataTable(filteredResult);
  }, [filters]);

  return (
    <StarWarsContext.Provider
      value={ {
        dataTable,
        filters,
        setFilters,
        columns,
        setColumns,
      } }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
