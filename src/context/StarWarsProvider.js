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

  const [orderedList, setOrderedList] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [orderColumn, setOrderColumn] = useState('name');

  useEffect(() => {
    const menosUm = -1;
    if ((order === 'ASC') && (orderColumn === 'name')) {
      const newListAsc = [...dataTable];
      newListAsc.sort((a, b) => {
        if (a[orderColumn] > b[orderColumn]) { return 1; }
        if (b[orderColumn] > a[orderColumn]) { return menosUm; } return 0;
      });
      setOrderedList(newListAsc);
    }
  }, [dataTable, order, orderColumn]);

  useEffect(() => {
    const menosUm = -1;
    if ((order === 'DESC') && (orderColumn === 'name')) {
      const newListAsc = [...dataTable];
      newListAsc.sort((a, b) => {
        if (a[orderColumn] < b[orderColumn]) { return 1; }
        if (b[orderColumn] < a[orderColumn]) { return menosUm; } return 0;
      });
      setOrderedList(newListAsc);
    }
  }, [dataTable, order, orderColumn]);

  useEffect(() => {
    if ((order === 'ASC') && (orderColumn !== 'name')) {
      const newListAsc = [...dataTable];
      newListAsc.sort((a, b) => (a[orderColumn] - b[orderColumn]));
      setOrderedList(newListAsc);
    }
  }, [dataTable, order, orderColumn]);

  useEffect(() => {
    if ((order === 'DESC') && (orderColumn !== 'name')) {
      const newListAsc = [...dataTable];
      newListAsc.sort((a, b) => (b[orderColumn] - a[orderColumn]));
      setOrderedList(newListAsc);
    }
  }, [dataTable, order, orderColumn]);

  return (
    <StarWarsContext.Provider
      value={ {
        dataTable,
        filters,
        setFilters,
        columns,
        setColumns,
        orderedList,
        setOrder,
        setOrderColumn,
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
