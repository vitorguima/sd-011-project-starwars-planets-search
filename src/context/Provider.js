import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import filterData from '../services/filterData';

export default function Provider({ children }) {
  // API data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // Filtro por input de nome
  const [name, setNameFilter] = useState('');
  // Filtros numéricos
  const [filterByNumericValues, setNumericValuesFilters] = useState([]);
  const [numericValues, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  // Quando é feita a atualização dos filtros
  const [updateFilter, setUpdateFilter] = useState(false);
  const [removedFilter, setRemovedFilter] = useState(false);
  // Ordenação
  const [order, setOrderFilter] = useState({
    column: 'name',
    sort: 'ASC',
  });
  const [orderColumn, setOrderColumn] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => {
        response.json()
          .then(({ results }) => setData(results));
      });
  }, []);

  useEffect(() => {
    const filter = () => {
      if (updateFilter || removedFilter) {
        let newData;
        if (removedFilter) {
          newData = filterData(filterByNumericValues, data);
        } else {
          const newFilters = [...filterByNumericValues, { ...numericValues }];
          newData = filterData(newFilters, data);
          setNumericValuesFilters(newFilters);
          setNumericFilter({
            column: '',
            comparison: '',
            value: '',
          });
        }
        setFilteredData(newData);
        setUpdateFilter(false);
        setRemovedFilter(false);
      }
    };
    filter();
  });

  const handleNumericFilter = ({ name: property, value }) => {
    setNumericFilter({
      ...numericValues,
      [property]: value,
    });
  };

  const removeFilter = (index) => {
    const newData = filterByNumericValues.filter((_element, i) => i !== index);
    setNumericValuesFilters(newData);
    setRemovedFilter(true);
  };

  const usedFilters = filterByNumericValues.map(({ column }) => column);

  const contextValue = {
    data,
    filteredData,
    allFilters: ['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'],
    usedFilters,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
      order,
    },
    numericValues,
    setNameFilter,
    handleNumericFilter,
    setUpdateFilter,
    removeFilter,
    setOrderColumn,
    setSort,
    orderColumn,
    sort,
    setOrderFilter,
  };
  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element,
}.isRequired;
